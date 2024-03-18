package com.tiandtech.core.domain.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * 短信登录对象
 */

@Data
public class SmsLoginBody {

    /**
     * 租户ID
     */
    @NotBlank(message = "{tenant.number.not.blank}")
    private String tenantId;

    /**
     * 手机号
     */
    @NotBlank(message = "{user.mobile.not.blank}")
    private String mobile;

    /**
     * 短信code
     */
    @NotBlank(message = "{sms.code.not.blank}")
    private String smsCode;

}
