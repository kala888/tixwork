package com.tiandtech.system.domain;

import com.baomidou.mybatisplus.annotation.TableName;
import com.tiandtech.tenant.core.TenantEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.util.Date;

/**
 * 系统访问记录表 sys_login_record
 */

@EqualsAndHashCode(callSuper = true)
@Data
@TableName("sys_login_record")
public class SysLoginRecord extends TenantEntity {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 用户账号
     */
    private String userName;

    /**
     * 登录状态 0成功 1失败
     */
    private String status;

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
     * 提示消息
     */
    private String msg;

    /**
     * 访问时间
     */
    private Date loginTime;

}
