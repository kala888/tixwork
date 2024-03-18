package com.tiandtech.base.enums;

import com.baomidou.mybatisplus.annotation.IEnum;
import com.tiandtech.base.candidatevalule.MarkAsCandidateValues;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 性别 枚举对象
 */
@Getter
@AllArgsConstructor
@MarkAsCandidateValues
public enum GenderType implements IEnum<String> {

    MALE("男"), FEMALE("女");

    private final String value;

    @Override
    public String getValue() {
        return value;
    }

}
