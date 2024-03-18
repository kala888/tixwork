package com.tiandtech.system.domain;

import com.baomidou.mybatisplus.annotation.TableName;
import com.tiandtech.base.enums.ImportExportType;
import com.tiandtech.mybatis.core.domain.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.io.Serial;


/**
 * 导入导出记录
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = true)
@TableName(value = "sys_import_export_record")
public class SysImportExportRecord extends BaseEntity {

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
