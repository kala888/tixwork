package com.tiandtech.base.utils;

import cn.hutool.core.lang.Validator;
import cn.hutool.core.util.StrUtil;

public class NameUtils {

    public static String toCamelCase(String name) {
        String value = name;
        if (Validator.isUpperCase(name)) {
            value = name.toLowerCase();
        }
        String tmp1 = StrUtil.replace(value, " ", "_");
        String tmp2 = StrUtil.replace(tmp1, "-", "_");
        String tmp3 = StrUtil.toSymbolCase(tmp2, '_');
        String tmp4 = StrUtil.replace(tmp3, "__", "_");
        return StrUtil.toCamelCase(tmp4);
    }
}
