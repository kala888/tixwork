package com.tiandtech.translation.impl;

import com.tiandtech.core.service.DictService;
import com.tiandtech.core.utils.StringUtils;
import com.tiandtech.translation.TransConstant;
import com.tiandtech.translation.TranslationInterface;
import com.tiandtech.translation.TranslationType;
import lombok.AllArgsConstructor;

/**
 * 字典翻译实现
 */
@AllArgsConstructor
@TranslationType(type = TransConstant.DICT_TYPE_TO_LABEL)
public class DictTypeTranslationImpl implements TranslationInterface<String> {

    private final DictService dictService;

    @Override
    public String translation(Object key, String other) {
        if (key instanceof String dictValue && StringUtils.isNotBlank(other)) {
            return dictService.getDictLabel(other, dictValue);
        }
        return null;
    }
}
