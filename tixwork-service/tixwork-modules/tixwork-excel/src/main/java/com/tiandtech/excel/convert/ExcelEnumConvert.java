package com.tiandtech.excel.convert;

import cn.hutool.core.annotation.AnnotationUtil;
import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import com.alibaba.excel.converters.Converter;
import com.alibaba.excel.enums.CellDataTypeEnum;
import com.alibaba.excel.exception.ExcelRuntimeException;
import com.alibaba.excel.metadata.GlobalConfiguration;
import com.alibaba.excel.metadata.data.ReadCellData;
import com.alibaba.excel.metadata.data.WriteCellData;
import com.alibaba.excel.metadata.property.ExcelContentProperty;
import com.tiandtech.base.candidatevalule.CandidateValue;
import com.tiandtech.base.candidatevalule.CandidateValueUtils;
import com.tiandtech.core.utils.reflect.ReflectUtils;
import com.tiandtech.excel.annotation.ExcelEnumFormat;
import lombok.extern.slf4j.Slf4j;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 枚举格式化转换处理
 */
@Slf4j
public class ExcelEnumConvert implements Converter<Object> {

    @Override
    public Class<Object> supportJavaTypeKey() {
        return Object.class;
    }

    @Override
    public CellDataTypeEnum supportExcelTypeKey() {
        return null;
    }

    @Override
    public Object convertToJavaData(ReadCellData<?> cellData, ExcelContentProperty contentProperty,
                                    GlobalConfiguration globalConfiguration) {
        cellData.checkEmpty();
        // 1、 Excel中填入的是枚举中指定的描述
        Object textValue = switch (cellData.getType()) {
            case STRING, DIRECT_STRING, RICH_TEXT_STRING -> cellData.getStringValue();
            case NUMBER -> cellData.getNumberValue();
            case BOOLEAN -> cellData.getBooleanValue();
            default -> throw new IllegalArgumentException("单元格类型异常!");
        };
        // 如果是空值
        if (ObjectUtil.isNull(textValue)) {
            return null;
        }
        String label = String.valueOf(textValue);
        // 2、获取枚举值列表
        List<CandidateValue> list = beforeConvert(contentProperty);

        // 3、遍历枚举值列表，找到对应的枚举值
        for (CandidateValue item : list) {
            if (item.getTitle().equalsIgnoreCase(label)) {
                return Convert.convert(contentProperty.getField().getType(), item.getId());
            }
        }
        // 4、如果没有找到对应的枚举值，抛出异常
        String all = list.stream().map(CandidateValue::getTitle).collect(Collectors.joining(","));
        String msg = StrUtil.format("枚举类型转换失败, 填写的值不在范围内：{}，可选值范围：{}", label, all);
        throw new ExcelRuntimeException(msg);
    }

    @Override
    public WriteCellData<String> convertToExcelData(Object object, ExcelContentProperty contentProperty,
                                                    GlobalConfiguration globalConfiguration) {

        // 1、输入库中的值
        if (ObjectUtil.isNull(object)) {
            return new WriteCellData<>("");
        }
        // 2、获取枚举值列表
        List<CandidateValue> list = beforeConvert(contentProperty);

        // 3、遍历枚举值列表，找到对应的枚举值
        String value = Convert.toStr(object, "");
        for (CandidateValue item : list) {
            if (item.getId().equalsIgnoreCase(value)) {
                return new WriteCellData<>(item.getTitle());
            }
        }
        // 4、如果没有找到对应的枚举值，直接返回值本身
        log.warn("不能找到枚举值" + value + "，所对应的枚举描述（title）, 直接返回值本身");
        return new WriteCellData<>(value);
    }

    private List<CandidateValue> beforeConvert(ExcelContentProperty contentProperty) {
        ExcelEnumFormat anno = getAnnotation(contentProperty.getField());
        if (anno == null) {
            String fileType = contentProperty.getField().getType().getSimpleName();
            return CandidateValueUtils.getCandidateValues(fileType);
        }

        List<CandidateValue> list = new ArrayList<>();
        Enum<?>[] enumConstants = anno.enumClass().getEnumConstants();
        for (Enum<?> enumConstant : enumConstants) {
            String codeValue = ReflectUtils.invokeGetter(enumConstant, anno.codeField());
            String textValue = ReflectUtils.invokeGetter(enumConstant, anno.textField());
            CandidateValue item = new CandidateValue();
            item.setId(codeValue);
            item.setTitle(textValue);
            list.add(item);
        }

        return list;

    }

    private ExcelEnumFormat getAnnotation(Field field) {
        return AnnotationUtil.getAnnotation(field, ExcelEnumFormat.class);
    }
}
