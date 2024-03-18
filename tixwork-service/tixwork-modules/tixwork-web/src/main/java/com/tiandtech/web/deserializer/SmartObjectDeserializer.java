package com.tiandtech.web.deserializer;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.map.MapUtil;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.BeanProperty;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.deser.ContextualDeserializer;
import com.tiandtech.mybatis.core.domain.BaseEntity;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.Map;

@Slf4j
public class SmartObjectDeserializer<T extends BaseEntity> extends JsonDeserializer<T> implements ContextualDeserializer {

    private Class<T> clazz;

    public SmartObjectDeserializer() {
    }

    public SmartObjectDeserializer(Class<T> clazz) {
        this.clazz = clazz;
    }

    @SuppressWarnings("unchecked")
    @Override
    public T deserialize(JsonParser jsonParser, DeserializationContext deserializationContext)
        throws IOException {
        try {
            return jsonParser.readValueAs(this.clazz);
        } catch (Exception e) {
            String text = jsonParser.getText();
            Map<String, Object> data = MapUtil.of("id", text);
            return BeanUtil.copyProperties(data, clazz);
        }
    }

    @Override
    public JsonDeserializer<?> createContextual(DeserializationContext ctxt, BeanProperty beanProperty) {
        Class<T> type = (Class<T>) beanProperty.getType().getRawClass();
        return new SmartObjectDeserializer<>(type);
    }
}
