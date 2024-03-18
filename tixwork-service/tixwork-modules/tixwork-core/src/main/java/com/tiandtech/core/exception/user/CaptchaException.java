package com.tiandtech.core.exception.user;

import java.io.Serial;

/**
 * 验证码错误异常类
 */
public class CaptchaException extends UserException {

    @Serial
    private static final long serialVersionUID = 1L;

    public CaptchaException() {
        super("user.jcaptcha.error");
    }
}
