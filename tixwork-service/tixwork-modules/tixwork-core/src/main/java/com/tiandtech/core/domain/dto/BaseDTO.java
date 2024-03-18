package com.tiandtech.core.domain.dto;

import cn.hutool.core.map.MapUtil;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/**
 * 基础的DTO
 */

@Data
public class BaseDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    private Long id;
    private String displayName;
    private Map<String, Object> params = new HashMap<>();
    private Map<String, Object> extraData = new HashMap<>();


    public void addExtraData(String key, Object value) {
        if (extraData == null) {
            extraData = new HashMap<>();
        }
        this.extraData.put(key, value);
    }

    public <T> T getExtraData(String key, Class<T> clazz) {
        return MapUtil.get(this.extraData, key, clazz);
    }

}
