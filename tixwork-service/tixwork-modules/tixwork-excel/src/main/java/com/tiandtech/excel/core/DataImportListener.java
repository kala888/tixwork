package com.tiandtech.excel.core;

import cn.hutool.core.util.StrUtil;
import com.alibaba.excel.context.AnalysisContext;
import com.alibaba.excel.event.AnalysisEventListener;
import com.alibaba.excel.exception.ExcelAnalysisStopException;
import com.alibaba.excel.exception.ExcelDataConvertException;
import com.tiandtech.core.utils.ValidatorUtils;
import com.tiandtech.core.validate.AddGroup;
import jakarta.validation.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 系统用户自定义导入
 */
public class DataImportListener<T> extends AnalysisEventListener<T> implements ExcelListener<T> {

    private static final Logger log = LoggerFactory.getLogger(DataImportListener.class);

    private int successNum = 0;
    private final List<String> errorList = new ArrayList<>();
    private final List<T> list = new ArrayList<>();

    @Override
    public void invoke(T obj, AnalysisContext context) {
        Integer line = context.readRowHolder().getRowIndex();
        try {
            ValidatorUtils.validate(obj, AddGroup.class);
            list.add(obj);
            successNum++;
        } catch (ConstraintViolationException e) {
            String tips = e.getConstraintViolations().stream().map(it -> it.getMessage()).collect(Collectors.joining(","));
            String message = StrUtil.format("第 {} 行校验出错：{}", line + 1, tips);
            errorList.add(message);
            log.error(message, e);
        }
    }

    @Override
    public void doAfterAllAnalysed(AnalysisContext context) {

    }

    @Override
    public ExcelResult<T> getExcelResult() {
        return new ExcelResult<T>() {

            @Override
            public String getSummary() {
                int errorCount = errorList.size();
                if (errorCount > 0) {
                    return "导入失败！共 " + errorCount + " 条数据格式不正确";
                }
                return "数据已全部导入成功！共 " + successNum + " 条";
            }

            @Override
            public List<T> getList() {
                return list;
            }

            @Override
            public List<String> getErrorList() {
                return errorList;
            }
        };
    }

    @Override
    public void onException(Exception exception, AnalysisContext context) throws Exception {
        log.info("解析转换错误：" + exception.getMessage());

        int row = 0, column = 0;
        if (exception instanceof ExcelDataConvertException) {
            ExcelDataConvertException e = (ExcelDataConvertException) exception;
            row = e.getRowIndex();
            column = e.getColumnIndex();
            String tips = exception.getCause().getMessage();
            String message = StrUtil.format("{}行{}列：{}", row + 1, column + 1, tips);
            log.error(message);
            errorList.add(message);
        }

        throw new ExcelAnalysisStopException("解析出错：" + row + "行 " + column + "列，停止运行");
    }

}
