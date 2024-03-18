package com.tiandtech.base.enums;

import com.baomidou.mybatisplus.annotation.IEnum;
import com.tiandtech.base.candidatevalule.MarkAsCandidateValues;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 状态类型，包含正常和启用
 * <p>
 * tixwork
 */
@Getter
@AllArgsConstructor
@MarkAsCandidateValues
public enum Status implements IEnum<String> {

    ENABLED("正常"), DISABLED("停用");

    private final String title;

    @Override
    public String getValue() {
        return name();
    }

}
