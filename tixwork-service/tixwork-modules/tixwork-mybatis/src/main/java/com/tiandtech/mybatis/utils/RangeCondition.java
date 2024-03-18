package com.tiandtech.mybatis.utils;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.NumberUtil;
import cn.hutool.core.util.ObjectUtil;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class RangeCondition {

    private Object start;
    private Object end;

    /**
     * params中的属性，可以是List也可以是xxxStart，xxxEnd
     * <p>
     * createTime=["xxx","xxx"] 或者 createTimeStart，createTimeEnd
     */
    public static RangeCondition build(Map params, String propertyName, String valueType) {
        var value = BeanUtil.getProperty(params, propertyName);
        var start = BeanUtil.getProperty(params, propertyName + "Start");
        var end = BeanUtil.getProperty(params, propertyName + "End");
        if (value instanceof List) {
            start = CollectionUtil.get((List) value, 0);
            end = CollectionUtil.get((List) value, 1);
        }
        if (ObjectUtil.isNotEmpty(start) && ObjectUtil.isNotEmpty(end)) {
            RangeCondition result = new RangeCondition();
            start = parseValue(start, valueType);
            end = parseValue(end, valueType);
            result.setStart(start);
            result.setEnd(end);
            return result;
        }
        return null;
    }

    public static Object parseValue(Object value, String type) {
        if ("date".equalsIgnoreCase(type) && value instanceof String) {
            return DateUtil.parse((String) value);
        }
        if ("integer".equalsIgnoreCase(type) && value instanceof String) {
            NumberUtil.parseNumber((String) value);
        }
        return value;
    }
}
