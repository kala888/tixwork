package com.tiandtech.base.enums;

import com.baomidou.mybatisplus.annotation.IEnum;
import com.tiandtech.base.candidatevalule.MarkAsCandidateValues;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor

@MarkAsCandidateValues
public enum ImportExportType implements IEnum<String> {

    IMPORT("导入"), EXPORT("导出");

    private final String title;

    @Override
    public String getValue() {
        return name();
    }

}
