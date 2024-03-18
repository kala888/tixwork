package com.tiandtech.system.domain.vo;

import com.alibaba.excel.annotation.ExcelIgnoreUnannotated;
import com.alibaba.excel.annotation.ExcelProperty;
import com.tiandtech.excel.annotation.ExcelDictFormat;
import com.tiandtech.excel.convert.ExcelDictConvert;
import com.tiandtech.system.domain.SysLoginRecord;
import com.tiandtech.tenant.core.TenantEntity;
import io.github.linpeilie.annotations.AutoMapper;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.util.Date;


@EqualsAndHashCode(callSuper = true)
@Data
@ExcelIgnoreUnannotated
@AutoMapper(target = SysLoginRecord.class)
public class SysLoginRecordVo extends TenantEntity {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 用户账号
     */
    @ExcelProperty(value = "用户账号")
    private String userName;

    /**
     * 登录状态（0成功 1失败）
     */
    @ExcelProperty(value = "登录状态", converter = ExcelDictConvert.class)
    @ExcelDictFormat(dictType = "sys_common_status")
    private String status;

    /**
     * 登录IP地址
     */
    @ExcelProperty(value = "登录地址")
    private String ipaddr;

    /**
     * 登录地点
     */
    @ExcelProperty(value = "登录地点")
    private String loginLocation;

    /**
     * 浏览器类型
     */
    @ExcelProperty(value = "浏览器")
    private String browser;

    /**
     * 操作系统
     */
    @ExcelProperty(value = "操作系统")
    private String os;


    /**
     * 提示消息
     */
    @ExcelProperty(value = "提示消息")
    private String msg;

    /**
     * 访问时间
     */
    @ExcelProperty(value = "访问时间")
    private Date loginTime;


}
