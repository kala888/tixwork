package com.tiandtech.dbrunner.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class DbTable {

    private String entity;

    @EqualsAndHashCode.Include
    private String name;
    private String comment;

    private List<DbColumn> columns = new ArrayList<>();
    private List<DbIndex> indexes = new ArrayList<>();

}

