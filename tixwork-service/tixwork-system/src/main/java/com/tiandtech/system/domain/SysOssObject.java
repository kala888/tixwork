package com.tiandtech.system.domain;

import com.baomidou.mybatisplus.annotation.TableName;
import com.tiandtech.tenant.core.TenantEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;

/**
 * OSS对象存储对象
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("sys_oss_object")
public class SysOssObject extends TenantEntity {

    @Serial
    private static final long serialVersionUID = 1L;

    @Override
    public String getDisplayName() {
        return originalName;
    }

    private String fileName;
    private String originalName;
    private String fileSuffix;
    private String url;
    private Long userId;

    private String service;


}
