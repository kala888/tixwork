package com.tiandtech.dbrunner.entity;

import lombok.Getter;

@Getter
public enum SqlCommand {
    SQL_FILE_MARK("tixwork formatted sql"),
    CHANGE_SET_MARK("changeset"),
    ROLLBACK_MARK("rollback");

    private final String value;

    SqlCommand(String value) {
        this.value = value;
    }

}
