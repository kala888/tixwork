package com.tiandtech.log.event;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

/**
 * 操作日志事件
 */

@Data
public class OperationEvent implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 日志主键
     */
    private Long id;

    /**
     * 租户ID
     */
    private String tenantId;

    /**
     * 操作模块
     */
    private String title;

    /**
     * 业务类型（0其它 1新增 2修改 3删除）
     */
    private Integer businessType;

    /**
     * 业务类型数组
     */
    private Integer[] businessTypes;

    /**
     * 请求方法
     */
    private String method;

    /**
     * 请求方式
     */
    private String requestMethod;

    /**
     * 操作类别（0其它 1后台用户 2手机端用户）
     */
    private Integer operatorType;

    /**
     * 操作人员
     */
    private String userName;

    /**
     * 部门名称
     */
    private String deptName;

    /**
     * 请求url
     */
    private String url;

    /**
     * 操作地址
     */
    private String ip;

    /**
     * 操作地点
     */
    private String location;

    /**
     * 请求参数
     */
    private String param;

    /**
     * 返回参数
     */
    private String jsonResult;

    /**
     * 操作状态（0正常 1异常）
     */
    private Integer status;

    /**
     * 错误消息
     */
    private String errorMsg;

    /**
     * 操作时间
     */
    private Date createTime;

    /**
     * 消耗时间
     */
    private Long costTime;
}
