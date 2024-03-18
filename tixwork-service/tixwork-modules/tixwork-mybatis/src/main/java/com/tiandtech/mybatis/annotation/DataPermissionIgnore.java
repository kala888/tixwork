package com.tiandtech.mybatis.annotation;

import java.lang.annotation.*;

/**
 * <b> 注意！！！非常危险的操作！！</b>
 * 方法级别数据权限忽略, 一般不用。使用于后台scheduler出发的定时任务
 */
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface DataPermissionIgnore {
}
