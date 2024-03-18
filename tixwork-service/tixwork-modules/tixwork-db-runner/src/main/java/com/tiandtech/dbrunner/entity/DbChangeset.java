package com.tiandtech.dbrunner.entity;

import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class DbChangeset {
    public static final String EXECUTE_TYPE_FULL_SQL = "1";
    public static final String EXECUTE_TYPE_PATCH_SQL = "2";
    private String name;
    private String author;
    private String fileName;
    private String md5;
    private Date createTime;
    private String executeType; // sql, rollback, rollback-sql
    private String brief;

    private String sql;
    private String rollbackSql;
    private List<String> lines = new ArrayList<>();

    private List<PatchSql> patchSqlList = new ArrayList<>();

}
