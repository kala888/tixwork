package com.tiandtech.system.domain.bo;

import com.tiandtech.mybatis.core.domain.BaseEntity;
import com.tiandtech.system.domain.SysOssObject;
import io.github.linpeilie.annotations.AutoMapper;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * OSS对象存储分页查询对象 sys_oss
 */
@Data
@EqualsAndHashCode(callSuper = true)
@AutoMapper(target = SysOssObject.class, reverseConvertGenerate = false)
public class SysOssObjectBo extends BaseEntity {

    /**
     * 文件名
     */
    private String fileName;

    /**
     * 原名
     */
    private String originalName;

    /**
     * 文件后缀名
     */
    private String fileSuffix;

    /**
     * URL地址
     */
    private String url;

    /**
     * 服务商
     */
    private String service;

}
