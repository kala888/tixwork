package com.tiandtech.base.enums;

import com.baomidou.mybatisplus.annotation.IEnum;
import com.tiandtech.base.candidatevalule.MarkAsCandidateValues;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 菜单类型 枚举对象
 * <p>
 * tixwork
 */
@Getter
@AllArgsConstructor
@MarkAsCandidateValues
public enum MenuType implements IEnum<String> {

    FOLDER("目录"), MENU("菜单"), FUNC("功能");

    private final String title;

    @Override
    public String getValue() {
        return name();
    }
}
