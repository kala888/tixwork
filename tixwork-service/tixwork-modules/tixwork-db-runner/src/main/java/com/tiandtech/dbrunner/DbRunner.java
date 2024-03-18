package com.tiandtech.dbrunner;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.date.DateUnit;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.io.IoUtil;
import cn.hutool.core.io.resource.ResourceUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.db.Db;
import cn.hutool.db.Entity;
import com.tiandtech.core.exception.ServiceException;
import com.tiandtech.dbrunner.entity.DbChangeset;
import com.tiandtech.dbrunner.entity.PatchSql;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

import javax.sql.DataSource;
import java.io.InputStream;
import java.net.InetAddress;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * 扫描sql文件，并执行DB初始化
 */
@Slf4j
public class DbRunner {
    private static final String LOG_TABLE = "tixwork_db_changelog";
    private static final String LOCK_TABLE = "tixwork_db_changelog_lock";
    private static final String TABLE_EXITS_SQL = "select 1 from tixwork_db_changelog limit 1";

    private final DataSource dataSource;
    private final List<String> paths;
    private final String moduleName;

    public DbRunner(DataSource dataSource, List<String> paths, String moduleName) {
        this.dataSource = dataSource;
        this.paths = paths;
        this.moduleName = moduleName;
    }

    private Db useDb() {
        return Db.use(dataSource);
    }

    public List<DbChangeset> diffTables() {
        String schema = moduleName + "/schema.json";
        return new SqlDiff(dataSource, schema).diffTables();
    }

    /**
     * changeset 执行入口
     * <p>
     * 1. 自动创建changelog表，tixwork_db_changelog
     * <p>
     * 2. 扫描sql文件，解析出changeset
     * <p>
     * 3. 比较db_changelog日志，执行changeset或者比较md5
     */
    public boolean initialTables() {
        // 1.init changeset table
        boolean firstInitial = this.initDbChangelogTable();
        // 2. 得有锁
        boolean getTheLock = this.acquireLock();
        if (!getTheLock) {
            log.error("未获得db_changelog_lock锁，退出。请仔细清理" + LOCK_TABLE + "表，然后重试。");
            System.exit(1);
        }
        try {
            // 3.scan file
            List<DbChangeset> changesetList = new SqlFileScanner().loadChangeset(this.paths);
            // 4. execute sql
            DbChangesetHelper.execute(useDb(), changesetList);
        } finally {
            // 99.得释放锁
            this.releaseLock();
        }
        log.info("dbRunner执行完毕");
        return firstInitial;
    }

    private void releaseLock() {
        Entity lockEntity = new Entity(LOCK_TABLE);
        lockEntity.set("id", 1);
        try {
            useDb().del(lockEntity);
        } catch (SQLException e) {
            log.error("释放db_changelog_lock锁失败, 请手动处理不然后续启动将有问题");
            throw new RuntimeException(e);
        }
    }

    @SneakyThrows
    private boolean acquireLock() {
        Db database = useDb();
        String ip = InetAddress.getLocalHost().getHostAddress();
        Connection connect = database.getConnection();
        connect.setAutoCommit(false);

        String sql = StrUtil.format("select * from {} for update", LOCK_TABLE);
        Entity lockEntity = new Entity(LOCK_TABLE);
        lockEntity.set("id", 1);
        lockEntity.set("locked", true);
        lockEntity.set("lock_time", new Date());
        lockEntity.set("locked_by", ip);
        for (int i = 0; i < 10; i++) {
            try {
                List<Entity> lock = database.query(sql);
                if (CollectionUtil.isNotEmpty(lock)) {
                    if (DateUtil.between(lock.get(0).getDate("lock_time"), new Date(), DateUnit.MINUTE) > 5) {
                        throw new ServiceException("已经被其他应用锁定，稍后再试。但是很有可能是个异常退出的问题。");
                    }
                    throw new ServiceException("数据库log表已经被其他应用锁定，稍后再试。");
                }
                database.insertOrUpdate(lockEntity);
                connect.commit();
                connect.setAutoCommit(true);
                return true;
            } catch (Exception e) {
                try {
                    Thread.sleep(3 * 1000);
                } catch (InterruptedException ex) {
                    throw new RuntimeException(ex);
                }
                log.warn(e.getMessage());
                log.warn("获取db_changelog_lock锁失败，正在重试... ");
            }
        }
        connect.setAutoCommit(true);
        return false;
    }


    /**
     * 初始化changelog表
     */
    @SneakyThrows
    private boolean initDbChangelogTable() {
        InputStream inputStream = ResourceUtil.getStreamSafe("tixwork_db_changelog.sql");
        String table = IoUtil.readUtf8(inputStream);
        Db database = useDb();
        try {
            database.query(TABLE_EXITS_SQL);
            log.debug(LOG_TABLE + " 已经存在");
            return false;
        } catch (Exception e) {
            log.info(LOG_TABLE + " 不存在, 开始初始化。");
            database.execute(table);
            return true;
        }
    }

    public void patchSql(List<DbChangeset> list) {
        log.debug("开始执行patchSql, 共计 {} 个DbChangeset", list.size());
        SqlFileScanner scanner = new SqlFileScanner();
        List<DbChangeset> def = scanner.loadChangeset(this.paths);
        for (DbChangeset changeset : list) {
            String tableName = changeset.getName();
            if (StrUtil.containsAny(tableName, DbRunnerConstant.NOT_USED_TABLES, DbRunnerConstant.NOT_USED_COLUMNS)) {
                continue;
            }
            // find changeset from file
            Optional<DbChangeset> op = def.stream()
                .filter(it -> it.getName().equalsIgnoreCase(tableName)).findFirst();
            if (op.isEmpty()) {
                String tips = StrUtil.format("没找到为啥没找到table {}的定义文件？有问题！！", tableName);
                log.warn(tips);
                throw new ServiceException(tips);
            }
            // 强制改成一致的md5，有风险
            changeset.setMd5(op.get().getMd5());
            String sql = changeset.getPatchSqlList().stream().filter(it -> {
                if ("danger".equalsIgnoreCase(it.getType().getLevel())) {
                    log.warn("危险操作，跳过执行{}", it.getSql());
                    return false;
                }
                return true;
            }).map(PatchSql::getSql).collect(Collectors.joining("\n"));
            changeset.setSql(sql);
            try {
                log.debug("执行变更，{}", changeset.getSql());
                DbChangesetHelper.execute(useDb(), changeset);
            } catch (Exception e) {
                log.error("执行失败，{}", changeset.getSql());
            }
        }
    }

}
