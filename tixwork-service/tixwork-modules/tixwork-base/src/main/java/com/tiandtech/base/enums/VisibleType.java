package com.tiandtech.base.enums;

import com.baomidou.mybatisplus.annotation.IEnum;
import com.tiandtech.base.candidatevalule.MarkAsCandidateValues;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 导入状态 枚举对象 importStatus
 * <p>
 * tixwork
 */
@Getter
@AllArgsConstructor
@MarkAsCandidateValues
public enum VisibleType implements IEnum<String> {

    HIDE("隐藏"), SHOW("显示");

    private final String title;

    @Override
    public String getValue() {
        return name();
    }

}
