package com.tiandtech.web.controller;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.collection.ListUtil;
import cn.hutool.core.text.NamingCase;
import cn.hutool.core.util.StrUtil;
import com.tiandtech.base.candidatevalule.CandidateValue;
import com.tiandtech.base.candidatevalule.CandidateValueUtils;
import com.tiandtech.core.constant.CacheNames;
import com.tiandtech.core.constant.UserConstants;
import com.tiandtech.core.domain.WebResult;
import com.tiandtech.core.utils.StringUtils;
import com.tiandtech.json.JsonTemplateUtils;
import com.tiandtech.json.JsonUtils;
import com.tiandtech.system.domain.SysConfig;
import com.tiandtech.system.service.SysConfigService;
import com.tiandtech.web.core.BaseController;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * 验证码操作处理
 */
@Validated
@RequiredArgsConstructor
@RestController
public class CandidateValuesController extends BaseController {

    private final SysConfigService configService;

    /**
     * types 只有一个的时候返回list，多于一个的时候返回map
     *
     * @param types 可以用逗号分隔，
     */
    @PostMapping("/options/{types}")
    public WebResult getCandidateValues(@PathVariable String types) {
        List<String> list = StringUtils.splitByComma(types);

        if (list.size() == 1) {
            List<CandidateValue> values = getCandidateValuesByKey(list.get(0));
            return WebResult.success(values);
        }
        //多余1个的时候，就返回map
        Map<String, List<CandidateValue>> result = new HashMap<>(list.size());
        list.forEach(it -> {
            String key = StrUtil.toCamelCase(NamingCase.toUnderlineCase(it)) + "Options";
            List<CandidateValue> values = getCandidateValuesByKey(it);
            result.put(key, values);
        });
        return WebResult.success(result);
    }

    /**
     * enums 可以被dict覆盖
     */
    @Cacheable(cacheNames = CacheNames.CANDIDATE_VALUE, key = "#key")
    public List<CandidateValue> getCandidateValuesByKey(String key) {
        List<CandidateValue> enumValues = CandidateValueUtils.getCandidateValues(key);
        List<CandidateValue> dictValues = getCandidateValuesFromDict(key);
        if (CollectionUtil.isEmpty(enumValues)) {
            return dictValues;
        }
        Map<String, CandidateValue> collect = dictValues.stream()
            .collect(Collectors.toMap(CandidateValue::getId, Function.identity()));
        return enumValues.stream().map(it -> {
            CandidateValue tmp = collect.get(it.getId());
            return tmp == null ? it : tmp;
        }).collect(Collectors.toList());

    }

    private List<CandidateValue> getCandidateValuesFromDict(String key) {
        SysConfig dict = configService.selectPublicDictByKey(key);
        if (dict != null) {
            List<SysConfig> list = dict.getValues();
            return list.stream().filter(it -> UserConstants.DICT_NORMAL.equalsIgnoreCase(it.getStatus()))
                .sorted(Comparator.comparing(SysConfig::getSortOrder))
                .map(it -> {
                    CandidateValue value = new CandidateValue();
                    String id = StrUtil.isNotEmpty(it.getKey()) ? it.getKey() : it.getValue();
                    value.setId(id);
                    value.setTitle(it.getTitle());
                    value.setBrief(it.getRemark());
                    value.setExtraData(it);
                    return value;
                }).collect(Collectors.toList());
        }
        return ListUtil.empty();
    }

    @GetMapping("/data/cities")
    public WebResult cities() {
        String content = JsonTemplateUtils.getContent("cities.json");
        List<CandidateValue> result = JsonUtils.parseArray(content, CandidateValue.class);
        return WebResult.success(result);
    }

}
