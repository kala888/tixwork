package com.tiandtech.system.domain.vo;

import com.alibaba.excel.annotation.ExcelIgnoreUnannotated;
import com.alibaba.excel.annotation.ExcelProperty;
import com.tiandtech.excel.annotation.ExcelDictFormat;
import com.tiandtech.excel.convert.ExcelDictConvert;
import com.tiandtech.mybatis.core.domain.BaseEntity;
import com.tiandtech.system.domain.SysPost;
import io.github.linpeilie.annotations.AutoMapper;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;


/**
 * 岗位信息视图对象 sys_post
 */
@EqualsAndHashCode(callSuper = true)
@Data
@ExcelIgnoreUnannotated
@AutoMapper(target = SysPost.class)
public class SysPostVo extends BaseEntity {

    @Serial
    private static final long serialVersionUID = 1L;

    @Override
    public String getDisplayName() {
        return postName;
    }

    /**
     * 岗位编码
     */
    @ExcelProperty(value = "岗位编码")
    private String postCode;

    /**
     * 岗位名称
     */
    @ExcelProperty(value = "岗位名称")
    private String postName;

    /**
     * 显示顺序
     */
    @ExcelProperty(value = "岗位排序")
    private Double sortOrder;

    /**
     * 状态（0正常 1停用）
     */
    @ExcelProperty(value = "状态", converter = ExcelDictConvert.class)
    @ExcelDictFormat(dictType = "system.status")
    private String status;

    /**
     * 备注
     */
    @ExcelProperty(value = "备注")
    private String remark;

}
