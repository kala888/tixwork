package com.tiandtech.system.domain.vo;

import com.alibaba.excel.annotation.ExcelProperty;
import com.tiandtech.base.enums.GenderType;
import com.tiandtech.excel.annotation.ExcelDictFormat;
import com.tiandtech.excel.convert.ExcelDictConvert;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

/**
 * 用户对象导入VO
 */

@Data
@NoArgsConstructor
// @Accessors(chain = true) // 导入不允许使用 会找不到set方法
public class SysUserImportVo implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 用户ID
     */
    @ExcelProperty(value = "用户序号")
    private Long userId;

    /**
     * 部门ID
     */
    @ExcelProperty(value = "部门编号")
    private Long deptId;

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
    private GenderType gender;

    /**
     * 帐号状态（0正常 1停用）
     */
    @ExcelProperty(value = "帐号状态", converter = ExcelDictConvert.class)
    @ExcelDictFormat(dictType = "system.status")
    private String status;

}
