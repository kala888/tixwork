package com.tiandtech.core.enums;

import com.tiandtech.core.utils.StringUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 设备类型 针对多套 用户体系
 */
@Getter
@AllArgsConstructor
public enum UserType {

    /**
     * pc端
     */
    SYS_USER("SYS_USER"),

    /**
     * app端
     */
    APP_USER("APP_USER");

    private final String userType;

    public static UserType getUserType(String loginId) {
        String value = com.tiandtech.base.utils.Getter.get(
            () -> StringUtils.splitList(loginId, ":").get(0)
        ).orElse("");
        return UserType.valueOf(value);
    }
}
