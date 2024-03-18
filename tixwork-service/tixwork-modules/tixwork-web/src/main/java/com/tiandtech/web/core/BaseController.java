package com.tiandtech.web.core;

import com.tiandtech.core.domain.WebResult;
import com.tiandtech.core.utils.StringUtils;

/**
 * web层通用数据处理
 */
public class BaseController {

    /**
     * 响应返回结果
     *
     * @param rows 影响行数
     * @return 操作结果
     */
    protected WebResult<Void> toAjax(int rows) {
        return rows > 0 ? WebResult.success() : WebResult.error();
    }

    /**
     * 响应返回结果
     *
     * @param result 结果
     * @return 操作结果
     */
    protected WebResult<Void> toAjax(boolean result) {
        return result ? WebResult.success() : WebResult.error();
    }

    /**
     * 页面跳转
     */
    public String redirect(String url) {
        return StringUtils.format("redirect:{}", url);
    }

}
