package com.tiandtech.excel.core;

import java.util.List;

/**
 * excel返回对象
 */
public interface ExcelResult<T> {

    List<T> getList();

    List<String> getErrorList();

    String getSummary();
}
