package com.tiandtech.oss.client;

import java.util.Arrays;
import java.util.List;

/**
 * 对象存储常量
 */
public interface OssConstant {

    /**
     * 默认配置KEY
     */
//    String DEFAULT_CONFIG_KEY = GlobalConstants.GLOBAL_REDIS_KEY + "oss_config:default_config";
    String DEFAULT_CONFIG_KEY = "oss_config:default_config";

    /**
     * 系统数据ids
     */
    List<Long> SYSTEM_DATA_IDS = Arrays.asList(1L, 2L, 3L, 4L);

    /**
     * 云服务商
     */
    String[] CLOUD_SERVICE = new String[]{"aliyun", "qcloud", "qiniu", "obs"};

    /**
     * https 状态
     */
    String IS_HTTPS = "Y";

}
