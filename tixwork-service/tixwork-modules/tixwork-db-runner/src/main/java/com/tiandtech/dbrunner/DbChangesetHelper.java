package com.tiandtech.dbrunner;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.date.DateTime;
import cn.hutool.core.text.CharSequenceUtil;
import cn.hutool.db.Db;
import cn.hutool.db.Entity;
import com.tiandtech.dbrunner.entity.DbChangeset;
import lombok.extern.slf4j.Slf4j;

import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

@Slf4j
public class DbChangesetHelper {

    private static final String LOG_TABLE = "tixwork_db_changelog";

    /**
     * 执行changeset，保存Db，如果失败，尝试回滚并，异常退出启动
     */
    public static void execute(Db database, DbChangeset changeset) throws SQLException {
        if (CharSequenceUtil.isBlank(changeset.getSql())) {
            log.warn("sql为空，{}.{}", changeset.getFileName(), changeset.getName());
            return;
        }
        Statement statement = database.getConnection().createStatement();
        try {
//            statement.executeQuery(changeset.getSql());
            statement.execute(changeset.getSql());
        } catch (Exception e) {
            log.warn("sql 执行失败，{}.{}: {}", changeset.getFileName(), changeset.getName(), e.getMessage());
            log.warn("失败sql，{}", changeset.getSql());
            try {
                String rollback = changeset.getRollbackSql();
                if (statement != null && CharSequenceUtil.isNotBlank(rollback)) {
                    statement.executeUpdate(changeset.getRollbackSql());
                }
            } catch (Exception ex) {
                String msg = CharSequenceUtil.format("回滚失败，{}.{}", changeset.getFileName(), changeset.getName());
                log.error(msg, ex);
            }
            log.error("异常退出：sql 执行失败，请仔细检查并修复。");
            System.exit(1);
        }
        // 记录执行记录
        changeset.setCreateTime(DateTime.now());

        Entity entity = new Entity();
        entity.set("name", changeset.getName());
        entity.set("author", changeset.getAuthor());
        entity.set("file_name", changeset.getFileName());
        entity.set("md5", changeset.getMd5());
        entity.set("create_time", changeset.getCreateTime());
        entity.set("execute_type", changeset.getExecuteType());
        entity.set("brief", changeset.getBrief());
        entity.setTableName(LOG_TABLE);
        if (DbChangeset.EXECUTE_TYPE_PATCH_SQL.equalsIgnoreCase(changeset.getExecuteType())) {
            database.update(
                new Entity().setTableName(LOG_TABLE)
                    .set("md5", changeset.getMd5()),
                new Entity()
                    .set("name", changeset.getName())
                    .set("execute_type", DbChangeset.EXECUTE_TYPE_FULL_SQL)
            );
        }

        database.insert(entity);

    }

    /**
     * 处理changeset:
     * <p>
     * 1. 未执行，则自动执行。
     * <p>
     * 2. 已经执行过，校验md5，如果不一致，提示需要修复
     */
    public static void execute(Db database, List<DbChangeset> changesetList) {
        if (CollUtil.isEmpty(changesetList)) {
            log.debug("没有需要执行的sql");
            return;
        }
        for (DbChangeset changeset : changesetList) {
            try {
                // 根据name从数据库中获取执行记录
                Entity entity = database.get(
                    Entity.create(LOG_TABLE).set("name", changeset.getName())
                     .set("execute_type", DbChangeset.EXECUTE_TYPE_FULL_SQL)
                );
                // 如果未执行过
                if (entity == null) {
                    DbChangesetHelper.execute(database, changeset);
                    continue;
                }
                DbChangeset dbLog = entity.toBean(DbChangeset.class);
                // 如果执行过, 但是md5不一致，说明产生了变化，可以通过SqlDiff来修复
                if (!changeset.getMd5().equals(dbLog.getMd5())) {
                    String tips = CharSequenceUtil.format(
                        "文件 {}.{} 与数据库中的执行记录不一致, 请仔细检查并修复（可以使用SqlDiff来进行修复）。Db中的md5：{}, 新的md5：{}",
                        changeset.getFileName(),
                        changeset.getName(),
                        dbLog.getMd5(),
                        changeset.getMd5()
                    );
                    log.warn(tips);
                }
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }


}
