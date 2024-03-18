package com.tiandtech.system.domain;

import com.baomidou.mybatisplus.annotation.TableName;
import com.tiandtech.tenant.core.TenantEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;

/**
 * 对象存储配置对象 sys_oss_config
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("sys_oss_config")
public class SysOssConfig extends TenantEntity {

    @Serial
    private static final long serialVersionUID = 1L;

    @Override
    public String getDisplayName() {
        return configKey;
    }

    /**
     * 配置key
     */
    private String configKey;

    /**
     * accessKey
     */
    private String accessKey;

    /**
     * 秘钥
     */
    private String secretKey;

    /**
     * 桶名称
     */
    private String bucketName;

    /**
     * 前缀
     */
    private String prefix;

    /**
     * 访问站点
     */
    private String endpoint;

    /**
     * 自定义域名
     */
    private String domain;

//    /**
//     * 是否https（0否 1是）
//     */
//    private String isHttps;

    /**
     * 域
     */
    private String region;

    /**
     * 是否默认（0=是,1=否）
     */
    private String status;

    /**
     * 扩展字段
     */
    private String ext1;

    /**
     * 备注
     */
    private String remark;

    /**
     * 桶权限类型(0private 1public 2custom)
     */
    private String accessPolicy;
}
