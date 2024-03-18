package com.tiandtech.core.exception;

import cn.hutool.core.util.StrUtil;

import java.io.Serial;

/**
 * 业务异常
 */
public class BizException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    private String message = "";

    @Override
    public String getMessage() {
        if (StrUtil.isNotEmpty(message)) {
            return super.getMessage();
        }
        return message;
    }

    public BizException() {
    }

    public BizException(String template, Object... args) {
        this.message = StrUtil.format(template, args);
    }

    public BizException(String message) {
        super(message);
        this.message = message;
    }

    public BizException(String message, Throwable cause) {
        super(message, cause);
        this.message = message;
    }

    public BizException(Throwable cause) {
        super(cause);
    }

    public BizException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
        this.message = message;
    }
}
