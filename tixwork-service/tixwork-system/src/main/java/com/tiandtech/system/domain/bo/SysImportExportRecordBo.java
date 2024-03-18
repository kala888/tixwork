package com.tiandtech.system.domain.bo;

import com.tiandtech.base.enums.ImportExportType;
import com.tiandtech.core.validate.AddGroup;
import com.tiandtech.core.validate.EditGroup;
import com.tiandtech.mybatis.core.domain.BaseEntity;
import com.tiandtech.system.domain.SysImportExportRecord;
import io.github.linpeilie.annotations.AutoMapper;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;


/**
 * 导入导出记录
 */
@Data
@EqualsAndHashCode(callSuper = true)
@AutoMapper(target = SysImportExportRecord.class, reverseConvertGenerate = false)
public class SysImportExportRecordBo extends BaseEntity {

    @Serial
    private static final long serialVersionUID = 1L;


    @NotNull(message = "导入导出类型不能为空", groups = {AddGroup.class, EditGroup.class})
    private ImportExportType type;

    /**
     * 导入文件名
     */
    @Size(message = "文件名长度不能超过100", max = 100, groups = {AddGroup.class, EditGroup.class})
    private String fileName;
    /**
     * 文件md5
     */
    @NotBlank(message = "文件md5不能为空", groups = {AddGroup.class, EditGroup.class})
    @Size(message = "文件md5长度不能超过100", max = 100, groups = {AddGroup.class, EditGroup.class})
    private String fileMd5;
    /**
     * 操作者
     */
    @Size(message = "操作者长度不能超过100", max = 100, groups = {AddGroup.class, EditGroup.class})
    private String operationUser;

    /**
     * 操作者
     */
    @NotNull(message = "操作者ID不能为空", groups = {AddGroup.class, EditGroup.class})
    private Long operationUserId;

    /**
     * 导入结果
     */
    @Size(message = "导入结果长度不能超过500", max = 500, groups = {AddGroup.class, EditGroup.class})
    private String result;

}
