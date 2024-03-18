package com.tiandtech.core.domain;

import cn.hutool.core.map.MapUtil;
import cn.hutool.http.HttpStatus;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.base.domain.dto.EleToast;
import com.tiandtech.core.exception.GlobalException;
import com.tiandtech.core.utils.ServletUtils;
import com.tiandtech.core.utils.ViewUtils;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * 响应信息主体
 */
@Data
@NoArgsConstructor
public class WebResult<T> implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    public static class TableDataInfo<T> extends WebResult<List<T>> {

    }

    public static final int SUCCESS = cn.hutool.http.HttpStatus.HTTP_OK;
    public static final int ERROR = cn.hutool.http.HttpStatus.HTTP_INTERNAL_ERROR;

    private int code;
    private String msg;
    private T data;
    private Long total;


    public WebResult(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public WebResult(int code, String msg, T data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }


    // 成功信息
    public static WebResult success() {
        return WebResult.success("操作成功");
    }

    // 1. success by page
    public static <T> TableDataInfo<T> success(Page<T> page) {
        TableDataInfo<T> rspData = new TableDataInfo<>();
        rspData.setCode(cn.hutool.http.HttpStatus.HTTP_OK);
        rspData.setMsg("查询成功");
        rspData.setData(page.getRecords());
        rspData.setTotal(page.getTotal());
        return rspData;
    }

    // 1. success by list
    public static <T> TableDataInfo<T> success(List<T> list) {
        TableDataInfo<T> rspData = new TableDataInfo<>();
        rspData.setCode(HttpStatus.HTTP_OK);
        rspData.setMsg("查询成功");
        rspData.setData(list);
        rspData.setTotal((long) list.size());
        return rspData;
    }

    public static <T> WebResult<T> success(T data) {
        return WebResult.success("操作成功", data);
    }

    public static WebResult<String> success(String msg) {
        return WebResult.success(msg, msg);
    }

    public static <T> WebResult<T> success(String msg, T data) {
        return new WebResult<>(SUCCESS, msg, data);
    }


    // 错误信息
    public static <T> WebResult<T> error(int code, String msg, T data) {
        ServletUtils.getResponse().setStatus(code);
        ViewUtils.setResponseView(GlobalException.class);
        return new WebResult<>(code, msg, data);
    }

    public static WebResult error() {
        Map data = MapUtil.builder().put("success", false).build();
        return WebResult.error(ERROR, "操作失败", data);
    }

    public static <T> WebResult<T> error(String msg) {
        return WebResult.error(ERROR, msg, null);
    }

    public static <T> WebResult<T> error(String msg, T data) {
        return WebResult.error(ERROR, msg, data);
    }

    public static <T> WebResult<T> error(T data) {
        return WebResult.error(ERROR, "操作失败", data);
    }


    public static <T> WebResult<T> error(int code, String msg) {
        return WebResult.error(code, msg, null);
    }


    // TOAST
    public static WebResult<Map> toast(String msg) {
        Map<String, EleToast> result = MapUtil.newHashMap();
        result.put("toast", new EleToast(msg));
        return WebResult.success(result);
    }

    public static <T> Boolean isError(WebResult<T> ret) {
        return !isSuccess(ret);
    }

    public static <T> Boolean isSuccess(WebResult<T> ret) {
        return WebResult.SUCCESS == ret.getCode();
    }
}
