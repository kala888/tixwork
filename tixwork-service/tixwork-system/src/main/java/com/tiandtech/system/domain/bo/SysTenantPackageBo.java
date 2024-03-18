package com.tiandtech.system.domain.bo;

import com.tiandtech.core.validate.AddGroup;
import com.tiandtech.core.validate.EditGroup;
import com.tiandtech.mybatis.core.domain.BaseEntity;
import com.tiandtech.system.domain.SysTenantPackage;
import io.github.linpeilie.annotations.AutoMapper;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * 租户套餐业务对象 sys_tenant_package
 */

@Data
@EqualsAndHashCode(callSuper = true)
@AutoMapper(target = SysTenantPackage.class, reverseConvertGenerate = false)
public class SysTenantPackageBo extends BaseEntity {

    /**
     * 套餐名称
     */
    @NotBlank(message = "套餐名称不能为空", groups = {AddGroup.class, EditGroup.class})
    private String packageName;

    /**
     * 关联菜单id
     */
    private List<Long> menuIds;

    /**
     * 备注
     */
    private String remark;

    /**
     * 菜单树选择项是否关联显示
     */
    private Boolean menuCheckStrictly;

    /**
     * 状态（0正常 1停用）
     */
    private String status;


}
