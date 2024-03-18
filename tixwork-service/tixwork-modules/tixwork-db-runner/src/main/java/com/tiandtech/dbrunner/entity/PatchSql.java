package com.tiandtech.dbrunner.entity;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;


@Data
@Builder
@ToString(onlyExplicitlyIncluded = true)
public class PatchSql {
    @ToString.Include
    private String sql;

    private PatchSqlType type;
}
