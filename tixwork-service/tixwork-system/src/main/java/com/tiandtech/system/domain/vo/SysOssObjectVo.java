package com.tiandtech.system.domain.vo;

import com.tiandtech.mybatis.core.domain.BaseEntity;
import com.tiandtech.system.domain.SysOssObject;
import com.tiandtech.translation.TransConstant;
import com.tiandtech.translation.Translation;
import io.github.linpeilie.annotations.AutoMapper;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;

/**
 * OSS对象存储视图对象 sys_oss
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AutoMapper(target = SysOssObject.class)
public class SysOssObjectVo extends BaseEntity {

    @Serial
    private static final long serialVersionUID = 1L;

    public String getDisplayName() {
        return originalName;
    }

    private String fileName;
    private String originalName;
    private String fileSuffix;
    private String url;

    /**
     * 上传人名称
     */
    @Translation(type = TransConstant.USER_ID_TO_NAME, mapper = "createBy")
    private String createByName;

    /**
     * 服务商
     */
    private String service;


}
