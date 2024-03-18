package com.tiandtech.system.domain.vo;

import com.alibaba.excel.annotation.ExcelIgnoreUnannotated;
import com.tiandtech.base.enums.ImportExportType;
import com.tiandtech.mybatis.core.domain.BaseEntity;
import com.tiandtech.system.domain.SysImportExportRecord;
import io.github.linpeilie.annotations.AutoMapper;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;


/**
 * 导入导出记录
 */
@EqualsAndHashCode(callSuper = true)
@Data
@ExcelIgnoreUnannotated
@AutoMapper(target = SysImportExportRecord.class)
public class SysImportExportRecordVo extends BaseEntity {

    @Serial
    private static final long serialVersionUID = 1L;

    @Override
    public String getDisplayName() {
        return this.getFileName();
    }

    private ImportExportType type;

    private String fileName;
    private String fileMd5;
    private String operationUser;
    private Long operationUserId;
    private String result;

}
