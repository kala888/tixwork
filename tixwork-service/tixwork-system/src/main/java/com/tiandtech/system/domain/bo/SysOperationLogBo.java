package com.tiandtech.system.domain.bo;

import com.baomidou.mybatisplus.annotation.TableField;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.tiandtech.log.event.OperationEvent;
import com.tiandtech.system.domain.SysOperationLog;
import io.github.linpeilie.annotations.AutoMapper;
import io.github.linpeilie.annotations.AutoMappers;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * 操作日志记录业务对象 sys_oper_log
 *
 * @date 2023-02-07
 */

@Data
@AutoMappers({
    @AutoMapper(target = SysOperationLog.class, reverseConvertGenerate = false),
    @AutoMapper(target = OperationEvent.class)
})
public class SysOperationLogBo implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    public String getDisplayName() {
        return title;
    }

    private Long id;

    /**
     * 租户编号
     */
    private String tenantId;
    /**
     * 模块标题
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
     * 方法名称
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
     * 请求URL
     */
    private String url;

    /**
     * 主机地址
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
     * 消耗时间
     */
    private Long costTime;


    /**
     * 操作时间
     */
    private Date createTime;

    /**
     * 请求参数
     */
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @TableField(exist = false)
    private Map<String, Object> params = new HashMap<>();

}
