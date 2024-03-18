package com.tiandtech.base.candidatevalule;

import cn.hutool.cache.Cache;
import cn.hutool.cache.CacheUtil;
import cn.hutool.core.util.ClassUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.ReflectUtil;
import cn.hutool.log.StaticLog;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class CandidateValueUtils {

    private static final Cache<String, List<CandidateValue>> fifoCache = CacheUtil.newFIFOCache(300);

    public static List<CandidateValue> getCandidateValues(String name) {
        var cacheKey = "candidateValues." + name;
        List<CandidateValue> cached = fifoCache.get(cacheKey);
        if (cached != null) {
            StaticLog.debug("get {} candidateValues from cache {}.", name, cached);
            return cached;
        }

        Set<Class<?>> classes = ClassUtil.scanPackageByAnnotation("com.tiandtech", MarkAsCandidateValues.class);
        List<CandidateValue> values = new ArrayList<>();
        for (Class<?> clz : classes) {
            if (clz.getSimpleName().equalsIgnoreCase(name)) {
                Object[] objects = clz.getEnumConstants();
                try {
                    Method getTitle = clz.getMethod("getTitle");
                    Method getCode = clz.getMethod("name");
                    for (Object obj : objects) {
                        String code = ReflectUtil.invoke(obj, getCode);
                        String title = ReflectUtil.invoke(obj, getTitle);
                        CandidateValue item = new CandidateValue();
                        item.setId(code);
                        item.setTitle(title);
                        values.add(item);
                        StaticLog.debug("find enum {}, values {} ", clz.getName(), values);
                    }
                } catch (NoSuchMethodException e) {
                    StaticLog.error("{} don't have getValue() and name(), but marked as MarkAsCandidateValues  ", clz.getName());
                }
                break;
            }
        }

        if (ObjectUtil.isEmpty(values)) {
            StaticLog.warn("can not find any values for {}, and cached empty values to mem", name);
        }
        fifoCache.put(cacheKey, values);
        return values;
    }
}
