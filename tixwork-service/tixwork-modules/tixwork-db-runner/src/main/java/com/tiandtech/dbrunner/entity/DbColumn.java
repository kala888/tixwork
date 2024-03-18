package com.tiandtech.dbrunner.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class DbColumn {

    private String field; // 关联的Field name
    @EqualsAndHashCode.Include
    private String name; // 字段名
    private String type; // 字段类型
    private Integer length;  //长度
    private String typeDef = ""; // 带长度的
    private String constraint = "";
    private String defaultDef = "";
    private String comment;

    //    private int type;
//    private String typeName; type
//    private int size; /// length
    private Integer digit; //DECIMAL_DIGITS
    private boolean isNullable;

    private String index;
    private Integer sortOrder;

    //    private String comment;
    //    private boolean autoIncrement;
    //    private String columnDef;
}
