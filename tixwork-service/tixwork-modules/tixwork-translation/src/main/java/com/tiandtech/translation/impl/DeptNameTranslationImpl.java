package com.tiandtech.translation.impl;

import com.tiandtech.core.service.DeptService;
import com.tiandtech.translation.TransConstant;
import com.tiandtech.translation.TranslationInterface;
import com.tiandtech.translation.TranslationType;
import lombok.AllArgsConstructor;

/**
 * 部门翻译实现
 */
@AllArgsConstructor
@TranslationType(type = TransConstant.DEPT_ID_TO_NAME)
public class DeptNameTranslationImpl implements TranslationInterface<String> {

    private final DeptService deptService;

    @Override
    public String translation(Object key, String other) {
        if (key instanceof String ids) {
            return deptService.selectDeptNameByIds(ids);
        } else if (key instanceof Long id) {
            return deptService.selectDeptNameByIds(id.toString());
        }
        return null;
    }
}
