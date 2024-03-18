package com.tiandtech.system.domain.bo;

import com.tiandtech.system.domain.SysLoginRecord;
import com.tiandtech.tenant.core.TenantEntity;
import io.github.linpeilie.annotations.AutoMapper;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * 系统访问记录业务对象
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AutoMapper(target = SysLoginRecord.class, reverseConvertGenerate = false)
public class SysLoginRecordBo extends TenantEntity {

    /**
     * 用户账号
     */
    private String userName;

    /**
     * 登录IP地址
     */
    private String ipaddr;

    /**
     * 登录地点
     */
    private String loginLocation;

    /**
     * 浏览器类型
     */
    private String browser;

    /**
     * 操作系统
     */
    private String os;

    /**
     * 登录状态（0成功 1失败）
     */
    private String status;

    /**
     * 提示消息
     */
    private String msg;

    /**
     * 访问时间
     */
    private Date loginTime;

    /**
     * 请求参数
     */
    private Map<String, Object> params = new HashMap<>();


}
