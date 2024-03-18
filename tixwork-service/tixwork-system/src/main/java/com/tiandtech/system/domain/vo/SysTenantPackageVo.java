package com.tiandtech.system.domain.vo;

import com.alibaba.excel.annotation.ExcelIgnoreUnannotated;
import com.alibaba.excel.annotation.ExcelProperty;
import com.tiandtech.excel.annotation.ExcelDictFormat;
import com.tiandtech.excel.convert.ExcelDictConvert;
import com.tiandtech.mybatis.core.domain.BaseEntity;
import com.tiandtech.system.domain.SysTenantPackage;
import io.github.linpeilie.annotations.AutoMapper;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.util.List;


/**
 * 租户套餐视图对象 sys_tenant_package
 */
@EqualsAndHashCode(callSuper = true)
@Data
@ExcelIgnoreUnannotated
@AutoMapper(target = SysTenantPackage.class)
public class SysTenantPackageVo extends BaseEntity {

    @Serial
    private static final long serialVersionUID = 1L;

    @Override
    public String getDisplayName() {
        return this.packageName;
    }

    /**
     * 套餐名称
     */
    @ExcelProperty(value = "套餐名称")
    private String packageName;

    /**
     * 关联菜单id
     */
    @ExcelProperty(value = "关联菜单id")
    private List<Long> menuIds;

    /**
     * 备注
     */
    @ExcelProperty(value = "备注")
    private String remark;

    /**
     * 菜单树选择项是否关联显示
     */
    @ExcelProperty(value = "菜单树选择项是否关联显示")
    private Boolean menuCheckStrictly;

    /**
     * 状态（0正常 1停用）
     */
    @ExcelProperty(value = "状态", converter = ExcelDictConvert.class)
    @ExcelDictFormat(readConverterExp = "0=正常,1=停用")
    private String status;


}
