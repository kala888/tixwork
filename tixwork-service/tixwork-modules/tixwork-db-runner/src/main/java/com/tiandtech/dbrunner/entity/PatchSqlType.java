package com.tiandtech.dbrunner.entity;

import com.tiandtech.dbrunner.DbRunnerConstant;
import lombok.Getter;


@Getter
public enum PatchSqlType {
    ADD_TABLE(DbRunnerConstant.NORMAL),
    COMMENT_TABLE(DbRunnerConstant.NORMAL),
    DROP_TABLE(DbRunnerConstant.DANGER),
    DROP_COLUMN(DbRunnerConstant.DANGER),
    ADD_COLUMN(DbRunnerConstant.NORMAL),
    CHANGE_LENGTH_CHANGE(DbRunnerConstant.NORMAL),
    CHANGE_TYPE_CHANGE(DbRunnerConstant.DANGER),
    CHANGE_CONSTRAINT(DbRunnerConstant.DANGER),
    COMMENT_COLUMN(DbRunnerConstant.NORMAL),
    DROP_INDEX(DbRunnerConstant.NORMAL),
    ADD_INDEX(DbRunnerConstant.NORMAL);

    PatchSqlType(String level) {
        this.level = level;
    }

    private final String level;
}
