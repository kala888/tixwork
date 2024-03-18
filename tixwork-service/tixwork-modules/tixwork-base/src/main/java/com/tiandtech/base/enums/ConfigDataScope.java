package com.tiandtech.base.enums;

import com.baomidou.mybatisplus.annotation.IEnum;
import com.tiandtech.base.candidatevalule.MarkAsCandidateValues;
import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
@MarkAsCandidateValues
public enum ConfigDataScope implements IEnum<String> {

    PUBLIC("公开"), PRIVATE("私有"), SYSTEM("系统级");

    private final String title;

    @Override
    public String getValue() {
        return name();
    }

}
