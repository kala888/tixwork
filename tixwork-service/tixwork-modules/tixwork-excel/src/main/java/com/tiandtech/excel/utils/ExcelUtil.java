package com.tiandtech.excel.utils;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.io.resource.ClassPathResource;
import cn.hutool.core.util.StrUtil;
import com.alibaba.excel.EasyExcel;
import com.alibaba.excel.ExcelWriter;
import com.alibaba.excel.write.builder.ExcelWriterSheetBuilder;
import com.alibaba.excel.write.metadata.WriteSheet;
import com.alibaba.excel.write.metadata.fill.FillConfig;
import com.alibaba.excel.write.metadata.fill.FillWrapper;
import com.alibaba.excel.write.metadata.style.WriteCellStyle;
import com.alibaba.excel.write.metadata.style.WriteFont;
import com.alibaba.excel.write.style.HorizontalCellStyleStrategy;
import com.alibaba.excel.write.style.column.LongestMatchColumnWidthStyleStrategy;
import com.tiandtech.core.exception.ServiceException;
import com.tiandtech.core.utils.StringUtils;
import com.tiandtech.core.utils.file.FileUtils;
import com.tiandtech.excel.convert.ExcelBigNumberConvert;
import com.tiandtech.excel.core.*;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.VerticalAlignment;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * Excel相关处理
 */
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ExcelUtil {

    /**
     * 同步导入(适用于小数据量)
     *
     * @param is 输入流
     * @return 转换后集合
     */
    public static <T> List<T> importExcel(InputStream is, Class<T> clazz) {
        return EasyExcel.read(is).head(clazz).autoCloseStream(false).sheet().doReadSync();
    }


    /**
     * 使用校验监听器 异步导入 同步返回
     *
     * @param is         输入流
     * @param clazz      对象类型
     * @param isValidate 是否 Validator 检验 默认为是
     * @return 转换后集合
     */
    public static <T> ExcelResult<T> importExcel(InputStream is, Class<T> clazz, boolean isValidate) {
        DefaultExcelListener<T> listener = new DefaultExcelListener<>(isValidate);
        EasyExcel.read(is, clazz, listener).sheet().doRead();
        return listener.getExcelResult();
    }

    /**
     * 使用自定义监听器 异步导入 自定义返回
     *
     * @param is       输入流
     * @param clazz    对象类型
     * @param listener 自定义监听器
     * @return 转换后集合
     */
    public static <T> ExcelResult<T> importExcel(InputStream is, Class<T> clazz, ExcelListener<T> listener) {
        EasyExcel.read(is, clazz, listener).sheet().doRead();
        return listener.getExcelResult();
    }

    /**
     * 导出excel
     *
     * @param list      导出数据集合
     * @param sheetName 工作表的名称
     * @param clazz     实体类
     * @param response  响应体
     */
    public static <T> String exportExcel(List<T> list, String sheetName, Class<T> clazz, HttpServletResponse response) {
        try {
            String fileName = resetResponse(sheetName, response);
            ServletOutputStream os = response.getOutputStream();
            exportExcel(list, sheetName, clazz, false, os, null);
            return fileName;
        } catch (IOException e) {
            throw new ServiceException("导出Excel异常");
        }
    }

    /**
     * 导出excel
     *
     * @param list      导出数据集合
     * @param sheetName 工作表的名称
     * @param clazz     实体类
     * @param response  响应体
     * @param options   级联下拉选
     */
    public static <T> String exportExcel(List<T> list, String sheetName, Class<T> clazz, HttpServletResponse response, List<DropDownOptions> options) {
        try {
            String fileName = resetResponse(sheetName, response);
            ServletOutputStream os = response.getOutputStream();
            exportExcel(list, sheetName, clazz, false, os, options);
            return fileName;
        } catch (IOException e) {
            throw new ServiceException("导出Excel异常");
        }
    }

    /**
     * 导出excel
     *
     * @param list      导出数据集合
     * @param sheetName 工作表的名称
     * @param clazz     实体类
     * @param merge     是否合并单元格
     * @param response  响应体
     */
    public static <T> String exportExcel(List<T> list, String sheetName, Class<T> clazz, boolean merge, HttpServletResponse response) {
        try {
            String fileName = resetResponse(sheetName, response);
            ServletOutputStream os = response.getOutputStream();
            exportExcel(list, sheetName, clazz, merge, os, null);
            return fileName;
        } catch (IOException e) {
            throw new ServiceException("导出Excel异常");
        }
    }


    /**
     * 导出excel
     *
     * @param list      导出数据集合
     * @param sheetName 工作表的名称
     * @param clazz     实体类
     * @param merge     是否合并单元格
     * @param response  响应体
     * @param options   级联下拉选
     */
    public static <T> String exportExcel(List<T> list, String sheetName, Class<T> clazz, boolean merge, HttpServletResponse response, List<DropDownOptions> options) {
        try {
            String fileName = resetResponse(sheetName, response);
            ServletOutputStream os = response.getOutputStream();
            exportExcel(list, sheetName, clazz, merge, os, options);
            return fileName;
        } catch (IOException e) {
            throw new ServiceException("导出Excel异常");
        }
    }

    /**
     * 导出excel
     *
     * @param list      导出数据集合
     * @param sheetName 工作表的名称
     * @param clazz     实体类
     * @param os        输出流
     */
    public static <T> void exportExcel(List<T> list, String sheetName, Class<T> clazz, OutputStream os) {
        exportExcel(list, sheetName, clazz, false, os, null);
    }

    /**
     * 导出excel
     *
     * @param list      导出数据集合
     * @param sheetName 工作表的名称
     * @param clazz     实体类
     * @param os        输出流
     * @param options   级联下拉选内容
     */
    public static <T> void exportExcel(List<T> list, String sheetName, Class<T> clazz, OutputStream os, List<DropDownOptions> options) {
        exportExcel(list, sheetName, clazz, false, os, options);
    }

    /**
     * 导出excel
     *
     * @param list      导出数据集合
     * @param sheetName 工作表的名称
     * @param clazz     实体类
     * @param merge     是否合并单元格
     * @param os        输出流
     */
    public static <T> void exportExcel(List<T> list, String sheetName, Class<T> clazz, boolean merge, OutputStream os, List<DropDownOptions> options) {
        ExcelWriterSheetBuilder builder = EasyExcel.write(os, clazz).autoCloseStream(false)
            // 自动适配
            .registerWriteHandler(new LongestMatchColumnWidthStyleStrategy())
            .registerWriteHandler(getStyleStrategy())
            .registerWriteHandler(new ColumnWidthStrategy())
            // 大数值自动转换 防止失真
            .registerConverter(new ExcelBigNumberConvert())
            .sheet(sheetName);
        if (merge) {
            // 合并处理器
            builder.registerWriteHandler(new CellMergeStrategy(list, true));
        }
        // 添加下拉框操作
        builder.registerWriteHandler(new ExcelDownHandler(options));
        builder.doWrite(list);
    }


    //设置样式 去除默认表头样式及设置内容居中
    private static HorizontalCellStyleStrategy getStyleStrategy() {
        //内容样式策略
        WriteCellStyle contentWriteCellStyle = new WriteCellStyle();
        //垂直居中,水平居中
        contentWriteCellStyle.setVerticalAlignment(VerticalAlignment.CENTER);
        contentWriteCellStyle.setHorizontalAlignment(HorizontalAlignment.CENTER);
        contentWriteCellStyle.setBorderLeft(BorderStyle.THIN);
        contentWriteCellStyle.setBorderTop(BorderStyle.THIN);
        contentWriteCellStyle.setBorderRight(BorderStyle.THIN);
        contentWriteCellStyle.setBorderBottom(BorderStyle.THIN);
        //设置 自动换行
        contentWriteCellStyle.setWrapped(true);
        // 字体策略
        WriteFont contentWriteFont = new WriteFont();
        // 字体大小
        contentWriteFont.setFontHeightInPoints((short) 12);
        contentWriteCellStyle.setWriteFont(contentWriteFont);

        //头策略使用默认
        WriteCellStyle headWriteCellStyle = new WriteCellStyle();
        // header背景色
        headWriteCellStyle.setFillForegroundColor(IndexedColors.WHITE.getIndex());
        // header字体
        WriteFont headWriteFont = new WriteFont();
        headWriteFont.setColor(IndexedColors.AUTOMATIC.index);
        headWriteFont.setBold(true);
        headWriteFont.setFontName("宋体");
        headWriteFont.setFontHeightInPoints((short) 11);
        headWriteCellStyle.setWriteFont(headWriteFont);

        return new HorizontalCellStyleStrategy(headWriteCellStyle, contentWriteCellStyle);
    }

    /**
     * 单表多数据模板导出 模板格式为 {.属性}
     *
     * @param filename     文件名
     * @param templatePath 模板路径 resource 目录下的路径包括模板文件名 例如: excel/temp.xlsx 重点: 模板文件必须放置到启动类对应的 resource 目录下
     * @param data         模板需要的数据
     * @param response     响应体
     */
    public static void exportTemplate(List<Object> data, String filename, String templatePath, HttpServletResponse response) {
        try {
            resetResponse(filename, response);
            ServletOutputStream os = response.getOutputStream();
            exportTemplate(data, templatePath, os);
        } catch (IOException e) {
            throw new ServiceException("导出Excel异常");
        }
    }

    /**
     * 单表多数据模板导出 模板格式为 {.属性}
     *
     * @param templatePath 模板路径 resource 目录下的路径包括模板文件名 例如: excel/temp.xlsx 重点: 模板文件必须放置到启动类对应的 resource 目录下
     * @param data         模板需要的数据
     * @param os           输出流
     */
    public static void exportTemplate(List<Object> data, String templatePath, OutputStream os) {
        ClassPathResource templateResource = new ClassPathResource(templatePath);
        ExcelWriter excelWriter = EasyExcel.write(os).withTemplate(templateResource.getStream()).autoCloseStream(false)
            // 大数值自动转换 防止失真
            .registerConverter(new ExcelBigNumberConvert()).build();
        WriteSheet writeSheet = EasyExcel.writerSheet().build();
        if (CollUtil.isEmpty(data)) {
            throw new IllegalArgumentException("数据为空");
        }
        // 单表多数据导出 模板格式为 {.属性}
        for (Object d : data) {
            excelWriter.fill(d, writeSheet);
        }
        excelWriter.finish();
    }

    /**
     * 多表多数据模板导出 模板格式为 {key.属性}
     *
     * @param filename     文件名
     * @param templatePath 模板路径 resource 目录下的路径包括模板文件名 例如: excel/temp.xlsx 重点: 模板文件必须放置到启动类对应的 resource 目录下
     * @param data         模板需要的数据
     * @param response     响应体
     */
    public static void exportTemplateMultiList(Map<String, Object> data, String filename, String templatePath, HttpServletResponse response) {
        try {
            resetResponse(filename, response);
            ServletOutputStream os = response.getOutputStream();
            exportTemplateMultiList(data, templatePath, os);
        } catch (IOException e) {
            throw new ServiceException("导出Excel异常");
        }
    }

    /**
     * 多表多数据模板导出 模板格式为 {key.属性}
     *
     * @param templatePath 模板路径 resource 目录下的路径包括模板文件名 例如: excel/temp.xlsx 重点: 模板文件必须放置到启动类对应的 resource 目录下
     * @param data         模板需要的数据
     * @param os           输出流
     */
    public static void exportTemplateMultiList(Map<String, Object> data, String templatePath, OutputStream os) {
        ClassPathResource templateResource = new ClassPathResource(templatePath);
        ExcelWriter excelWriter = EasyExcel.write(os).withTemplate(templateResource.getStream()).autoCloseStream(false)
            // 大数值自动转换 防止失真
            .registerConverter(new ExcelBigNumberConvert()).build();
        WriteSheet writeSheet = EasyExcel.writerSheet().build();
        if (CollUtil.isEmpty(data)) {
            throw new IllegalArgumentException("数据为空");
        }
        for (Map.Entry<String, Object> map : data.entrySet()) {
            // 设置列表后续还有数据
            FillConfig fillConfig = FillConfig.builder().forceNewRow(Boolean.TRUE).build();
            if (map.getValue() instanceof Collection) {
                // 多表导出必须使用 FillWrapper
                excelWriter.fill(new FillWrapper(map.getKey(), (Collection<?>) map.getValue()), fillConfig, writeSheet);
            } else {
                excelWriter.fill(map.getValue(), writeSheet);
            }
        }
        excelWriter.finish();
    }

    /**
     * 重置响应体
     */
    private static String resetResponse(String sheetName, HttpServletResponse response) {
        String filename = encodingFilename(sheetName);
        FileUtils.setAttachmentResponseHeader(response, filename);
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8");
        return filename;
    }

    /**
     * 解析导出值 0=男,1=女,2=未知
     *
     * @param propertyValue 参数值
     * @param converterExp  翻译注解
     * @param separator     分隔符
     * @return 解析后值
     */
    public static String convertByExp(String propertyValue, String converterExp, String separator) {
        StringBuilder propertyString = new StringBuilder();
        String[] convertSource = converterExp.split(StringUtils.SEPARATOR);
        for (String item : convertSource) {
            String[] itemArray = item.split("=");
            if (StringUtils.containsAny(propertyValue, separator)) {
                for (String value : propertyValue.split(separator)) {
                    if (itemArray[0].equals(value)) {
                        propertyString.append(itemArray[1] + separator);
                        break;
                    }
                }
            } else {
                if (itemArray[0].equals(propertyValue)) {
                    return itemArray[1];
                }
            }
        }
        return StringUtils.stripEnd(propertyString.toString(), separator);
    }

    /**
     * 反向解析值 男=0,女=1,未知=2
     *
     * @param propertyValue 参数值
     * @param converterExp  翻译注解
     * @param separator     分隔符
     * @return 解析后值
     */
    public static String reverseByExp(String propertyValue, String converterExp, String separator) {
        StringBuilder propertyString = new StringBuilder();
        String[] convertSource = converterExp.split(StringUtils.SEPARATOR);
        for (String item : convertSource) {
            String[] itemArray = item.split("=");
            if (StringUtils.containsAny(propertyValue, separator)) {
                for (String value : propertyValue.split(separator)) {
                    if (itemArray[1].equals(value)) {
                        propertyString.append(itemArray[0] + separator);
                        break;
                    }
                }
            } else {
                if (itemArray[1].equals(propertyValue)) {
                    return itemArray[0];
                }
            }
        }
        return StringUtils.stripEnd(propertyString.toString(), separator);
    }

    /**
     * 编码文件名
     */
    public static String encodingFilename(String filename) {
        return StrUtil.format("{}_{}.xlsx" , filename, cn.hutool.core.date.DateUtil.current());
    }

}
