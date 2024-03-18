package com.tiandtech.dbrunner;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.collection.ListUtil;
import cn.hutool.core.io.IoUtil;
import cn.hutool.core.io.resource.ResourceUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.db.meta.*;
import cn.hutool.extra.spring.SpringUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.tiandtech.core.config.TixworkConfig;
import com.tiandtech.core.utils.SpringUtils;
import com.tiandtech.core.utils.ToAdmin;
import com.tiandtech.dbrunner.entity.*;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

import javax.sql.DataSource;
import java.io.InputStream;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
public class SqlDiff {

    private static final TixworkConfig tixworkConfig = SpringUtil.getBean("tixworkConfig");

    private final Map<String, String> TYPE_MAPPING = Map.of(
        "int4", "int",
        "int8", "bigint",
        "bpchar", "char",
        "bool", "boolean"
    );


    private final DataSource dataSource;
    private final String schemaPath;

    public SqlDiff(DataSource dataSource, String schemaPath) {
        this.dataSource = dataSource;
        this.schemaPath = schemaPath;
    }

    private List<DbTable> schemaTables;
    private List<DbTable> dbTables;

    private List<PatchSql> listUnUsedTables() {
        // 1. 数据库中多的table
        Collection<DbTable> more = CollectionUtil.subtractToList(dbTables, schemaTables);
        if (CollectionUtil.isEmpty(more)) {
            log.debug("没有多余的旧表需要删除");
        }
        return more.stream().map(it ->
            PatchSql.builder()
                .type(PatchSqlType.DROP_TABLE)
                .sql(StrUtil.format("DROP TABLE IF EXISTS {};", it.getName()))
                .build()
        ).toList();
    }

    /**
     * 探测多余的columns
     */
    private List<PatchSql> listUnUsedColumns() {
        List<PatchSql> list = new ArrayList<>();

        List<String> tables = CollectionUtil.intersection(schemaTables, dbTables)
            .stream().map(DbTable::getName).toList();
        for (String tableName : tables) {
            DbTable dbTable = findFirst(dbTables, tableName);
            DbTable schemaTable = findFirst(schemaTables, tableName);
            Collection<DbColumn> more = CollectionUtil.subtractToList(dbTable.getColumns(), schemaTable.getColumns());
            list.addAll(
                more.stream().map(it ->
                    PatchSql.builder()
                        .type(PatchSqlType.DROP_COLUMN)
                        .sql(StrUtil.format("ALTER TABLE {} DROP COLUMN {};", tableName, it.getName()))
                        .build()
                ).toList()
            );
        }

        if (CollectionUtil.isEmpty(list)) {
            log.debug("没有多余的旧字段需要删除");
        }
        return list;
    }

    private List<String> listNewTables() {
        Collection<DbTable> less = CollectionUtil.subtractToList(schemaTables, dbTables);
        if (CollectionUtil.isEmpty(less)) {
            log.debug("没有表缺失");
        }
        return less.stream().map(DbTable::getName).toList();
    }


    /**
     * 比较自动生成的表
     */
    public List<DbChangeset> diffTables() {

        List<DbChangeset> changesetList = new ArrayList<>();

        //1. 将数据库meta和schema meta转化为统一规格
        log.debug("1.1 加载 schema meta");
        schemaTables = this.loadSchemaMeta();
        if (CollectionUtil.isEmpty(schemaTables)) {
            log.warn("未找到模型schema，放弃比较");
        }
        log.debug("1.2 加载 db meta");
        dbTables = this.loadDatabaseMeta();

        // 2. db中多余表和字段，应该给予删除提醒
        log.debug("2.1 探测数据库中多余的表。dbTables-schemaTables。");
        List<PatchSql> unUsedTables = this.listUnUsedTables();
        if (CollectionUtil.isNotEmpty(unUsedTables)) {
            log.warn("数据库中处在一些多余的表；可以适时谨慎删除, 参考sql如下:");
            log.warn(
                unUsedTables.stream()
                    .map(it -> StrUtil.format("\t{}", it.getSql()))
                    .collect(Collectors.joining("\n"))
            );
            DbChangeset changeset = new DbChangeset();
            changeset.setName(DbRunnerConstant.NOT_USED_TABLES);
            changeset.setPatchSqlList(unUsedTables);
            changesetList.add(changeset);
        }


        log.debug("2.2 探测数据库中多余的字段");
        List<PatchSql> unUsedColumns = this.listUnUsedColumns();
        if (CollectionUtil.isNotEmpty(unUsedColumns)) {
            log.warn("数据库中处在一些多余的column；可以适时谨慎删除, 参考sql如下:");
            log.warn(
                unUsedColumns.stream()
                    .map(it -> StrUtil.format("\t{}", it))
                    .collect(Collectors.joining("\n"))
            );
            DbChangeset changeset = new DbChangeset();
            changeset.setName(DbRunnerConstant.NOT_USED_COLUMNS);
            changeset.setPatchSqlList(unUsedColumns);
            changesetList.add(changeset);
        }

        // 2.3 数据库中多余的索引，提示删除（自动生成可能无法完美实现各种索引，暂时不检测）
//         this.listUnUsedIndexes();

        // 3 数据库中缺失table
        log.debug("3.1 探测数据库缺失的表，schemaTables-dbTables。如果缺表，应该自动创建。");
        List<String> newTables = this.listNewTables();
        if (CollectionUtil.isNotEmpty(newTables)) {
            log.warn("数据库中缺了一些业务表，但是这些理论上不应该出现。启动时dbrunner会自动检测并添加。除非关闭了dbrunner");
            log.warn("缺失的表：{}", newTables);
            if (SpringUtils.isProduction()) {
                ToAdmin.say(
                    StrUtil.format("【{}】生产数据库表缺失，请及时处理", tixworkConfig.getName()),
                    StrUtil.format(
                        "数据库中缺失了一些业务表，但是这些理论上不应该出现。启动时dbrunner会自动检测并添加。除非关闭了dbrunner。缺失的表：{}"
                        , StrUtil.join(",", newTables))
                );
            }
        }

        // 4. 找找table 找出变化。
        log.debug("探测表级变化，schemaTables ∩ dbTables。例如comment变化");
        // 交集 tables = schemaTables ∩ dbTables
        List<String> tableNameList = CollectionUtil.intersection(schemaTables, dbTables).stream()
            .map(DbTable::getName).toList();
        for (String table : tableNameList) {
            DbChangeset changeset = this.diffTable(table);
            if (changeset != null) {
                changesetList.add(changeset);
            }
        }

        if (CollectionUtil.isEmpty(changesetList)) {
            log.info("没有changeset需要更新");
        }
        return changesetList;
    }

    /**
     * 比较单个表
     */
    private DbChangeset diffTable(String table) {
        List<PatchSql> lines = new ArrayList<>();

        DbTable dbTable = findFirst(dbTables, table);
        DbTable schemaTable = findFirst(schemaTables, table);

        // 3.1 table comment 变化
        if (!StrUtil.equalsIgnoreCase(dbTable.getComment(), schemaTable.getComment())) {
            PatchSql sql = PatchSql.builder()
                .type(PatchSqlType.COMMENT_TABLE)
                .sql(StrUtil.format("comment on table {} is '{}';", table, schemaTable.getComment()))
                .build();
            lines.add(sql);
        }

        // 3.2 字段的添加，修改，约束变化，comment变化
        List<PatchSql> columUpdateSql = this.diffColumns(schemaTable, dbTable);
        lines.addAll(columUpdateSql);

        // 3.3 缺失的索引
        List<PatchSql> indexSql = this.diffIndexes(schemaTable, dbTable);
        lines.addAll(indexSql);
        if (CollectionUtil.isEmpty(lines)) {
            return null;
        }

        DbChangeset changeset = new DbChangeset();
        changeset.setName(table);
        changeset.setAuthor("system");
        changeset.setFileName("patch_by_diff");
//        changeset.setLines(lines);
//        changeset.setSql(StrUtil.join("\n", lines));
        changeset.setPatchSqlList(lines);
        changeset.setSql(StrUtil.join("\n", lines));
        changeset.setExecuteType(DbChangeset.EXECUTE_TYPE_PATCH_SQL);
        return changeset;
    }

    private List<PatchSql> diffIndexes(DbTable schemaTable, DbTable dbTable) {
        List<PatchSql> list = new ArrayList<>();

        List<DbIndex> dbIndexList = dbTable.getIndexes();
        for (DbIndex index : schemaTable.getIndexes()) {
            // 1. 从db找
            DbIndex dbIndex = findFirst(dbIndexList, index.getName());
            // 2. 新增索引
            if (dbIndex == null) {
                String sql = StrUtil.format("CREATE INDEX {} ON {} ({});",
                    index.getName(),
                    schemaTable.getName(),
                    index.getColumns()
                );
                list.add(
                    PatchSql.builder()
                        .type(PatchSqlType.ADD_INDEX)
                        .sql(sql)
                        .build()
                );
                continue;
            }

            String dbIndexStr = StrUtil.trim(dbIndex.getColumns()).replace("\s", "");
            String schemaIndexStr = StrUtil.trim(index.getColumns()).replace("\s", "");
            if (!StrUtil.equalsIgnoreCase(dbIndexStr, schemaIndexStr)) {
                String dropIndex = StrUtil.format("DROP INDEX {} ;", index.getName());
                String addIndex = StrUtil.format("CREATE INDEX {} ON {} ({});",
                    index.getName(),
                    schemaTable.getName(),
                    index.getColumns()
                );
                list.add(
                    PatchSql.builder()
                        .type(PatchSqlType.DROP_INDEX)
                        .sql(dropIndex)
                        .build()
                );
                list.add(
                    PatchSql.builder()
                        .type(PatchSqlType.ADD_INDEX)
                        .sql(addIndex)
                        .build()
                );
            }

        }

        return list;
    }

    private List<PatchSql> diffColumns(DbTable schemaTable, DbTable dbTable) {
        List<PatchSql> list = new ArrayList<>();

        List<DbColumn> dbColumnList = dbTable.getColumns();

        for (DbColumn column : schemaTable.getColumns()) {
            if (column.getName().equalsIgnoreCase("id")) {
                continue;
            }
            // 1. 从db找
            DbColumn dbColumn = findFirst(dbColumnList, column.getName());
            // 2. 新增字段
            if (dbColumn == null) {
                String sql = StrUtil.format(
                    "ALTER TABLE {} ADD IF NOT EXISTS {} {} {};",
                    schemaTable.getName(),
                    column.getName(),
                    column.getTypeDef(),
                    column.getConstraint()
                );
                list.add(PatchSql.builder()
                    .type(PatchSqlType.ADD_COLUMN)
                    .sql(sql)
                    .build()
                );
                String comment = StrUtil.format(
                    "COMMENT ON COLUMN {}.{} IS '{}';",
                    schemaTable.getName(),
                    column.getName(),
                    column.getComment()
                );
                list.add(PatchSql.builder()
                    .type(PatchSqlType.COMMENT_COLUMN)
                    .sql(comment)
                    .build()
                );
                continue;
            }

            List<PatchSql> sqls = columnChange(schemaTable, column, dbColumn);
            list.addAll(sqls);

            // 5. db 获取的default和原始定义的不一样，暂时放弃比较
//        log.debug("dbColumn.getDefaultDef()={},schema.getDefaultDef()={}", dbColumn.getDefaultDef(),schemaColumn.getDefaultDef());
//        boolean defaultValueChanged = !StrUtil.equalsIgnoreCase(
//            StrUtil.trim(dbColumn.getDefaultDef()),
//            StrUtil.trim(schemaColumn.getDefaultDef())
//        );

        }

        return list;
    }

    private List<PatchSql> columnChange(DbTable schemaTable, DbColumn column, DbColumn dbColumn) {
        List<PatchSql> list = new ArrayList<>();
        // 3. comments 变化
        if (!StrUtil.equalsIgnoreCase(dbColumn.getComment(), column.getComment())) {
            String sql = StrUtil.format(
                "COMMENT ON COLUMN {}.{} IS '{}';",
                schemaTable.getName(),
                column.getName(),
                column.getComment()
            );
            list.add(PatchSql.builder()
                .type(PatchSqlType.COMMENT_COLUMN)
                .sql(sql)
                .build()
            );
        }
        // 3. 类型和长度变化
        List<PatchSql> changedSql = columnTypeChange(schemaTable, column, dbColumn);
        list.addAll(changedSql);

        // 4. 约束变化（not null）
        if (!StrUtil.equalsIgnoreCase(
            StrUtil.trim(dbColumn.getConstraint()),
            StrUtil.trim(column.getConstraint()))
        ) {
            String sql = StrUtil.format("ALTER TABLE {} ALTER COLUMN {} set {};",
                schemaTable.getName(),
                column.getName(),
                column.getConstraint()
            );
            list.add(
                PatchSql.builder()
                    .type(PatchSqlType.CHANGE_CONSTRAINT)
                    .sql(sql)
                    .build()
            );
        }
        return list;
    }

    /**
     * 类型变化非常危险，不太应该自动执行
     */
    private List<PatchSql> columnTypeChange(DbTable schemaTable, DbColumn column, DbColumn dbColumn) {
        List<PatchSql> list = new ArrayList<>();

        boolean lengthChanged = column.getLength() != null
            && dbColumn.getLength() != null
            && !Objects.equals(column.getLength(), dbColumn.getLength());

        boolean typeChanged = !StrUtil.equalsIgnoreCase(dbColumn.getType(), column.getType());

        // 都没变
        if (!typeChanged && !lengthChanged) {
            return list;
        }

        // 类型没变，只是长度变化
        if (!typeChanged) {
            String sql = StrUtil.format("ALTER TABLE {} ALTER COLUMN {} type {} {};",
                schemaTable.getName(),
                column.getName(),
                column.getTypeDef(),
                column.getDefaultDef());
            list.add(PatchSql.builder()
                .type(PatchSqlType.CHANGE_LENGTH_CHANGE)
                .sql(sql)
                .build()
            );
            return list;
        }

        // 类型变了
        // 如果变化前后都不是varchar就转换为中间的varchar，例如int转timestamp，这里应该只是tips，不一定是正确的方案，非常危险
        if (!"varchar".equalsIgnoreCase(column.getType()) && !"varchar".equalsIgnoreCase(dbColumn.getType())) {
            //
            String sql = StrUtil.format("ALTER TABLE {} ALTER COLUMN {} type varchar;",
                schemaTable.getName(),
                column.getName(),
                column.getTypeDef());
            list.add(PatchSql.builder()
                .type(PatchSqlType.CHANGE_TYPE_CHANGE)
                .sql(sql)
                .build()
            );
        }

        String sql = StrUtil.format("ALTER TABLE {} ALTER COLUMN {} type {} USING {}::{} {};",
            schemaTable.getName(),
            column.getName(),
            column.getTypeDef(),
            column.getName(),
            column.getType(),
            column.getDefaultDef());
        list.add(PatchSql.builder()
            .type(PatchSqlType.CHANGE_TYPE_CHANGE)
            .sql(sql)
            .build()
        );
        return list;
    }


    private List<DbTable> loadSchemaMeta() {
        InputStream resource = ResourceUtil.getStreamSafe(schemaPath);
        if (resource == null) {
            log.warn("未找到模型schema，放弃比较");
            return ListUtil.empty();
        }
        String schema = IoUtil.readUtf8(resource);

        JSONObject jsonObject = JSONUtil.parseObj(schema);
        // 获取"nodes"数组
        List<JSONObject> nodeList = jsonObject.getByPath("nodes.data.table", ArrayList.class);
        // 创建一个用于存储data对象的列表
        Map<String, DbTable> tables = new HashMap<>();
        nodeList.stream()
            .filter(Objects::nonNull)
            .map(it -> it.toBean(DbTable.class))
            .forEach(it -> {
                DbTable table = tables.get(it.getName());
                if (table != null) {
                    table.getColumns().addAll(it.getColumns());
                } else {
                    tables.put(it.getName(), it);
                }
            });

        log.debug("schema table {}:{}", tables.size(), tables.keySet());
        return tables.values().stream().toList();
    }

    @SneakyThrows
    private List<DbTable> loadDatabaseMeta() {
        log.debug("连接数据库:{}", dataSource.getConnection().getMetaData().getURL());

        List<String> list = MetaUtil.getTables(dataSource);
        List<DbTable> tables = list.stream()
            // 过滤只包含生成的表
            .filter(it -> it.startsWith("ti_"))
            .map(tableName -> {
                Table table = MetaUtil.getTableMeta(dataSource, tableName);
                DbTable dbTable = BeanUtil.copyProperties(table, DbTable.class);
                dbTable.setName(table.getTableName());
                List<DbColumn> columnList = table.getColumns().stream().map(this::convertDbColumn).toList();
                List<DbIndex> indexList = table.getIndexInfoList().stream().map(this::convertDbIndex).toList();
                dbTable.setColumns(columnList);
                dbTable.setIndexes(indexList);
                table.getColumn("name");
                return dbTable;
            })
            .toList();

        log.debug("database table {}:{}", tables.size(), tables.stream().map(DbTable::getName).toList());
        return tables;
    }

    private DbIndex convertDbIndex(IndexInfo indexInfo) {
        DbIndex index = BeanUtil.copyProperties(indexInfo, DbIndex.class);
        index.setName(indexInfo.getIndexName());
        List<ColumnIndexInfo> columns = indexInfo.getColumnIndexInfoList();
        String indexStr = columns.stream()
            .map(ColumnIndexInfo::getColumnName)
            .collect(Collectors.joining(", "));
        index.setColumns(indexStr);
        return index;
    }

    private DbColumn convertDbColumn(Column column) {
        DbColumn dbColumn = BeanUtil.copyProperties(column, DbColumn.class);
        dbColumn.setName(column.getName());
        dbColumn.setType(column.getTypeName());
        dbColumn.setLength((int) column.getSize());

        String type = TYPE_MAPPING.get(column.getTypeName().toLowerCase());
        dbColumn.setType(type != null ? type : column.getTypeName());

        if (StrUtil.containsAny(dbColumn.getType(), "timestamp", "bool", "bigint", "json", "text", "bigserial")) {
            dbColumn.setLength(null);
        }

        String defaultValue = column.getColumnDef() == null ? "" : ("default " + column.getColumnDef());
        dbColumn.setDefaultDef(defaultValue);//可能有问题
        dbColumn.setConstraint(column.isNullable() ? "" : "not null");
        return dbColumn;
    }

    private <T> T findFirst(List<T> list, String name) {
        if (StrUtil.isNotBlank(name)) {
            for (T t : list) {
                String value = BeanUtil.getProperty(t, "name");
                if (name.equalsIgnoreCase(value)) {
                    return t;
                }
            }
        }
        return null;
    }
}
