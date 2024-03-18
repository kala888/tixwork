package com.tiandtech.log.event;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 登录事件
 */

@Data
public class LoginEvent implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private long id;

    /**
     * 租户ID
     */
    private String tenantId;

    /**
     * 用户账号
     */
    private String userName;

    /**
     * 登录状态 0成功 1失败
     */
    private String status;

    /**
     * 提示消息
     */
    private String message;

    /**
     * 其他参数
     */
    private Object[] args;

    private String userAgent;
    private String ip;

}
