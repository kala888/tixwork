package com.tiandtech.core.constant;

/**
 * 缓存组名称常量
 * <p>
 * key 格式为 cacheNames#ttl#maxIdleTime#maxSize
 * <p>
 * ttl 过期时间 如果设置为0则不过期 默认为0 maxIdleTime 最大空闲时间 根据LRU算法清理空闲数据 如果设置为0则不检测 默认为0 maxSize 组最大长度 根据LRU算法清理溢出数据 如果设置为0则无限长 默认为0
 * <p>
 * 例子: test#60s、test#0#60s、test#0#1m#1000、test#1h#0#500
 */
public interface CacheNames {


    /**
     * 系统配置
     */
    String SYS_CONFIG = "sys_config";

    String CANDIDATE_VALUE = "candidate_value";

    /**
     * 租户
     */
    String SYS_TENANT = GlobalConstants.GLOBAL_REDIS_KEY + "sys_tenant#30d";

    /**
     * 用户账户
     */
    String SYS_USER_NAME = "sys_user_name#30d";

    /**
     * 部门
     */
    String SYS_DEPT = "sys_dept#30d";

    /**
     * OSS内容
     */
    String SYS_OSS = "sys_oss#30d";

    /**
     * OSS配置
     */
//    String SYS_OSS_CONFIG = GlobalConstants.GLOBAL_REDIS_KEY + "sys_oss_config"; //添加global会忽略租户
    String SYS_OSS_CONFIG = "sys_oss_config";

}
