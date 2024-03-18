package com.tiandtech.system.domain;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import com.tiandtech.mybatis.core.domain.BaseEntity;
import com.tiandtech.mybatis.handler.ListOfLongTypeHandler;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.util.List;

/**
 * 租户套餐对象 sys_tenant_package
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName(value = "sys_tenant_package", autoResultMap = true)
public class SysTenantPackage extends BaseEntity {

    @Serial
    private static final long serialVersionUID = 1L;

    @Override
    public String getDisplayName() {
        return this.packageName;
    }

    /**
     * 套餐名称
     */
    private String packageName;
    /**
     * 关联菜单id
     */
    @TableField(typeHandler = ListOfLongTypeHandler.class)
    private List<Long> menuIds;
    /**
     * 备注
     */
    private String remark;
    /**
     * 菜单树选择项是否关联显示（ 0：父子不互相关联显示 1：父子互相关联显示）
     */
    private Boolean menuCheckStrictly;
    /**
     * 状态（0正常 1停用）
     */
    private String status;
    /**
     * 删除标志（0代表存在 2代表删除）
     */
    @TableLogic
    private String delFlag;

}
