package com.tiandtech.translation.impl;

import com.tiandtech.core.service.OssService;
import com.tiandtech.translation.TransConstant;
import com.tiandtech.translation.TranslationInterface;
import com.tiandtech.translation.TranslationType;
import lombok.AllArgsConstructor;

/**
 * OSS翻译实现
 */
@AllArgsConstructor
@TranslationType(type = TransConstant.OSS_ID_TO_URL)
public class OssUrlTranslationImpl implements TranslationInterface<String> {

    private final OssService ossService;

    @Override
    public String translation(Object key, String other) {
        if (key instanceof String ids) {
            return ossService.selectUrlByIds(ids);
        } else if (key instanceof Long id) {
            return ossService.selectUrlByIds(id.toString());
        }
        return null;
    }
}
