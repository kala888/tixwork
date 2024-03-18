package com.tiandtech.base.enums;

import com.baomidou.mybatisplus.annotation.IEnum;
import com.tiandtech.base.candidatevalule.MarkAsCandidateValues;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 组织类型:group 集团,  company 公司,  department部门
 */
@Getter
@AllArgsConstructor

@MarkAsCandidateValues
public enum DepartmentType implements IEnum<String> {

    GROUP("集团"), COMPANY("公司"), DEPARTMENT("部门");

    private final String title;

    @Override
    public String getValue() {
        return name();
    }

}
