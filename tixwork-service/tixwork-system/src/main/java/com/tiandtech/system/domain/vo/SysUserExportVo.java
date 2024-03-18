package com.tiandtech.system.domain.vo;

import com.alibaba.excel.annotation.ExcelProperty;
import com.tiandtech.base.enums.GenderType;
import com.tiandtech.excel.annotation.ExcelDictFormat;
import com.tiandtech.excel.convert.ExcelDictConvert;
import io.github.linpeilie.annotations.AutoMapper;
import io.github.linpeilie.annotations.ReverseAutoMapping;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

/**
 * 用户对象导出VO
 */

@Data
@NoArgsConstructor
@AutoMapper(target = SysUserVo.class, convertGenerate = false)
public class SysUserExportVo implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 用户ID
     */
    @ExcelProperty(value = "用户序号")
    private Long userId;

    /**
     * 用户账号
     */
    @ExcelProperty(value = "登录名称")
    private String userName;

    /**
     * 用户昵称
     */
    @ExcelProperty(value = "用户名称")
    private String nickName;

    /**
     * 用户邮箱
     */
    @ExcelProperty(value = "用户邮箱")
    private String email;

    /**
     * 手机号码
     */
    @ExcelProperty(value = "手机号码")
    private String mobile;

    /**
     * 用户性别
     */
    @ExcelProperty(value = "用户性别")
    private GenderType gender;

    /**
     * 帐号状态（0正常 1停用）
     */
    @ExcelProperty(value = "帐号状态", converter = ExcelDictConvert.class)
    @ExcelDictFormat(dictType = "system.status")
    private String status;

    /**
     * 最后登录IP
     */
    @ExcelProperty(value = "最后登录IP")
    private String loginIp;

    /**
     * 最后登录时间
     */
    @ExcelProperty(value = "最后登录时间")
    private Date loginDate;

    /**
     * 部门名称
     */
    @ReverseAutoMapping(target = "deptName", source = "dept.deptName")
    @ExcelProperty(value = "部门名称")
    private String deptName;

    /**
     * 负责人
     */
    @ReverseAutoMapping(target = "leader", source = "dept.leader")
    @ExcelProperty(value = "部门负责人")
    private String leader;

}
