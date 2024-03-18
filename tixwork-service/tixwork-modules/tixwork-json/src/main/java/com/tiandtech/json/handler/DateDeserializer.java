package com.tiandtech.json.handler;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.NumberUtil;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.annotation.JacksonStdImpl;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.Date;

/**
 * 日期反序列化，兼容Hutool的支持的所有日期格式
 */
@JacksonStdImpl
@Slf4j
public class DateDeserializer<T extends Date> extends JsonDeserializer<Date> {

    public static final DateDeserializer<Date> INSTANCE = new DateDeserializer<Date>();

    public DateDeserializer() {
        super();
    }

    @Override
    public Date deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        String text = jsonParser.getText();
        try {
            if (NumberUtil.isLong(text)) {
                return DateUtil.date(Long.parseLong(text));
            }
            return DateUtil.parse(text).toJdkDate();
        } catch (Exception e) {
            log.debug("DateDeserializer尝试转换Date失败:" + text);
        }
        return null;
    }
}
