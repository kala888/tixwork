package com.tiandtech.base.enums;

import com.baomidou.mybatisplus.annotation.IEnum;
import com.tiandtech.base.candidatevalule.MarkAsCandidateValues;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@MarkAsCandidateValues
public enum NoticeType implements IEnum<String> {

    NOTIFICATION("通知"),
    ANNOUNCEMENT("公告");

    private final String title;

    @Override
    public String getValue() {
        return name();
    }

}
