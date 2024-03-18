package com.tiandtech.system.domain.vo;

import com.alibaba.excel.annotation.ExcelIgnoreUnannotated;
import com.alibaba.excel.annotation.ExcelProperty;
import com.tiandtech.base.enums.DepartmentType;
import com.tiandtech.excel.annotation.ExcelDictFormat;
import com.tiandtech.excel.convert.ExcelDictConvert;
import com.tiandtech.mybatis.core.domain.BaseEntity;
import com.tiandtech.system.domain.SysDept;
import io.github.linpeilie.annotations.AutoMapper;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 部门视图对象 sys_dept
 */
@EqualsAndHashCode(callSuper = true)
@Data
@ExcelIgnoreUnannotated
@AutoMapper(target = SysDept.class)
public class SysDeptVo extends BaseEntity {

    @Serial
    private static final long serialVersionUID = 1L;

    @Override
    public String getDisplayName() {
        return this.deptName;
    }

    /**
     * 父部门id
     */
    private Long parentId;

    private List<SysDeptVo> children = new ArrayList<>();


    /**
     * 父部门名称
     */
    private String parentName;

    /**
     * 祖级列表
     */
    private String ancestors;

    /**
     * 部门名称
     */
    @ExcelProperty(value = "部门名称")
    private String deptName;

    /**
     * 显示顺序
     */
    private Double sortOrder;

    /**
     * 负责人
     */
    @ExcelProperty(value = "负责人")
    private String leader;

    /**
     * 联系电话
     */
    @ExcelProperty(value = "联系电话")
    private String mobile;

    /**
     * 邮箱
     */
    @ExcelProperty(value = "邮箱")
    private String email;


    @ExcelProperty(value = "组织类型")
    private DepartmentType deptType;

    /**
     * 部门状态（0正常 1停用）
     */
    @ExcelProperty(value = "部门状态", converter = ExcelDictConvert.class)
    @ExcelDictFormat(dictType = "system.status")
    private String status;

    /**
     * 创建时间
     */
    @ExcelProperty(value = "创建时间")
    private Date createTime;

}
