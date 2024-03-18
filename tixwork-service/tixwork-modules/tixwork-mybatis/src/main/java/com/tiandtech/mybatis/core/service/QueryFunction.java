package com.tiandtech.mybatis.core.service;

import com.github.yulichang.wrapper.MPJLambdaWrapper;

/**
 * 基于MPJ的链式查询辅助Query
 */
@FunctionalInterface
public interface QueryFunction<T> {

    void query(MPJLambdaWrapper<T> query);
}

