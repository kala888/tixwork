package com.tiandtech.dbrunner.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class DbIndex {

    @EqualsAndHashCode.Include
    private String name;
    private String columns;

}
