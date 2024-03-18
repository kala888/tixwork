package com.tiandtech.translation.impl;

import com.tiandtech.core.service.UserService;
import com.tiandtech.translation.TransConstant;
import com.tiandtech.translation.TranslationInterface;
import com.tiandtech.translation.TranslationType;
import lombok.AllArgsConstructor;

/**
 * 用户名翻译实现
 */
@AllArgsConstructor
@TranslationType(type = TransConstant.USER_ID_TO_NAME)
public class UserNameTranslationImpl implements TranslationInterface<String> {

    private final UserService userService;

    @Override
    public String translation(Object key, String other) {
        if (key instanceof Long id) {
            return userService.selectUserNameById(id);
        }
        return null;
    }
}
