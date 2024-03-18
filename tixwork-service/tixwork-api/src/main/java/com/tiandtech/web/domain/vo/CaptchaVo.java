package com.tiandtech.web.domain.vo;

import lombok.Data;

/**
 * 验证码信息
 */
@Data
public class CaptchaVo {

    /**
     * 是否开启验证码
     */
    private Boolean captchaEnabled = true;

    private String uuid;

    /**
     * 验证码图片
     */
    private String img;

}
