package com.tiandtech.system.domain.bo;

import com.tiandtech.base.enums.DepartmentType;
import com.tiandtech.core.validate.AddGroup;
import com.tiandtech.core.validate.EditGroup;
import com.tiandtech.mybatis.core.domain.BaseEntity;
import com.tiandtech.system.domain.SysDept;
import io.github.linpeilie.annotations.AutoMapper;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

/**
 * 部门业务对象 sys_dept
 */

@Data
@EqualsAndHashCode(callSuper = true)
@AutoMapper(target = SysDept.class, reverseConvertGenerate = false)
public class SysDeptBo extends BaseEntity {


    /**
     * 父部门ID
     */
    private Long parentId;

    private List<SysDeptBo> children = new ArrayList<>();

    /**
     * 部门名称
     */
    @NotBlank(message = "部门名称不能为空", groups = {AddGroup.class, EditGroup.class})
    @Size(min = 0, max = 30, message = "部门名称长度不能超过{max}个字符")
    private String deptName;

    /**
     * 显示顺序
     */
    @NotNull(message = "显示顺序不能为空")
    private Double sortOrder;

    /**
     * 负责人
     */
    private String leader;

    /**
     * 联系电话
     */
    @Size(min = 0, max = 11, message = "联系电话长度不能超过{max}个字符")
    private String mobile;

    /**
     * 邮箱
     */
    @Email(message = "邮箱格式不正确")
    @Size(min = 0, max = 50, message = "邮箱长度不能超过{max}个字符")
    private String email;

    @NotNull(message = "机构类型不能为空")
    private DepartmentType deptType;

    /**
     * 部门状态（0正常 1停用）
     */
    private String status;

}
