package com.tiandtech.system.domain;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import com.tiandtech.base.enums.DepartmentType;
import com.tiandtech.tenant.core.TenantEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.util.ArrayList;
import java.util.List;

/**
 * 部门表 sys_dept
 */

@Data
@EqualsAndHashCode(callSuper = true)
@TableName("sys_dept")
public class SysDept extends TenantEntity {

    @Serial
    private static final long serialVersionUID = 1L;

    @Override
    public String getDisplayName() {
        return this.deptName;
    }

    @TableId(value = "dept_id")
    private Long id;

    @TableField(exist = false)
    private List<SysDept> children = new ArrayList<>();


    /**
     * 父部门ID
     */
    private Long parentId;

    /**
     * 部门名称
     */
    private String deptName;

    /**
     * 显示顺序
     */
    private Double sortOrder;

    /**
     * 负责人
     */
    private String leader;

    /**
     * 联系电话
     */
    private String mobile;

    /**
     * 邮箱
     */
    private String email;

    /**
     * 组织类型
     */
    private DepartmentType deptType;

    /**
     * 部门状态:0正常,1停用
     */
    private String status;

    /**
     * 删除标志（0代表存在 2代表删除）
     */
    @TableLogic
    private String delFlag;

    /**
     * 祖级列表
     */
    private String ancestors;

}
