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
public enum ConfigType implements IEnum<String> {

    CONFIG("配置"), DICT("字典"), VALUE("字典值");

    private final String title;

    @Override
    public String getValue() {
        return name();
    }

}
