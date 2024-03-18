package com.tiandtech.system.domain.vo;

import com.alibaba.excel.annotation.ExcelIgnoreUnannotated;
import com.alibaba.excel.annotation.ExcelProperty;
import com.tiandtech.core.constant.UserConstants;
import com.tiandtech.excel.annotation.ExcelDictFormat;
import com.tiandtech.excel.convert.ExcelDictConvert;
import com.tiandtech.mybatis.core.domain.BaseEntity;
import com.tiandtech.system.domain.SysRole;
import io.github.linpeilie.annotations.AutoMapper;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;

/**
 * 角色信息视图对象 sys_role
 */
@EqualsAndHashCode(callSuper = true)
@Data
@ExcelIgnoreUnannotated
@AutoMapper(target = SysRole.class)
public class SysRoleVo extends BaseEntity {

    @Serial
    private static final long serialVersionUID = 1L;

    @Override
    public String getDisplayName() {
        return roleName;
    }

    /**
     * 角色名称
     */
    @ExcelProperty(value = "角色名称")
    private String roleName;

    /**
     * 角色权限字符串
     */
    @ExcelProperty(value = "角色权限")
    private String roleKey;

    /**
     * 显示顺序
     */
    @ExcelProperty(value = "角色排序")
    private Double sortOrder;

    /**
     * 数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）
     */
    @ExcelProperty(value = "数据范围", converter = ExcelDictConvert.class)
    @ExcelDictFormat(readConverterExp = "1=所有数据权限,2=自定义数据权限,3=本部门数据权限,4=本部门及以下数据权限,5=仅本人数据权限")
    private String dataScope;

    /**
     * 菜单树选择项是否关联显示
     */
    @ExcelProperty(value = "菜单树选择项是否关联显示")
    private Boolean menuCheckStrictly;

    /**
     * 部门树选择项是否关联显示
     */
    @ExcelProperty(value = "部门树选择项是否关联显示")
    private Boolean deptCheckStrictly;

    /**
     * 角色状态（0正常 1停用）
     */
    @ExcelProperty(value = "角色状态", converter = ExcelDictConvert.class)
    @ExcelDictFormat(dictType = "system.status")
    private String status;

    /**
     * 备注
     */
    @ExcelProperty(value = "备注")
    private String remark;


    /**
     * 用户是否存在此角色标识 默认不存在
     */
    private boolean flag = false;

    public boolean isSuperAdmin() {
        return UserConstants.SUPER_ADMIN_ID.equals(this.getId());
    }

}
