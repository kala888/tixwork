package com.tiandtech.core.domain.model;

import com.tiandtech.core.constant.UserConstants;
import com.tiandtech.core.validate.auth.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

/**
 * 用户登录对象
 */

@Data
public class LoginBody {

    /**
     * 客户端id
     */
    @NotBlank(message = "{auth.clientid.not.blank}")
    private String clientId;
    /**
     * 客户端key
     */
    private String clientKey;

    /**
     * 客户端秘钥
     */
    private String clientSecret;

    /**
     * 授权类型
     */
    @NotBlank(message = "{auth.grant.type.not.blank}")
    private String grantType;

    /**
     * 租户ID
     */
    private String tenantId;

    /**
     * 用户名
     */
    @NotBlank(message = "{user.username.not.blank}", groups = {PasswordGroup.class})
    @Length(min = UserConstants.USERNAME_MIN_LENGTH, max = UserConstants.USERNAME_MAX_LENGTH, message = "{user.username.length.valid}", groups = {PasswordGroup.class})
    private String userName;

    /**
     * 用户密码
     */
    @NotBlank(message = "{user.password.not.blank}", groups = {PasswordGroup.class})
    @Length(min = UserConstants.PASSWORD_MIN_LENGTH, max = UserConstants.PASSWORD_MAX_LENGTH, message = "{user.password.length.valid}", groups = {PasswordGroup.class})
    private String password;

    /**
     * 验证码/微信验证码
     */
    private String code;

    /**
     * 唯一标识
     */
    private String uuid;

    /**
     * 手机号
     */
    @NotBlank(message = "{user.phonenumber.not.blank}", groups = {SmsGroup.class})
    private String mobile;

    /**
     * 短信code
     */
    @NotBlank(message = "{sms.code.not.blank}", groups = {SmsGroup.class})
    private String smsCode;

    /**
     * 邮箱
     */
    @NotBlank(message = "{user.email.not.blank}", groups = {EmailGroup.class})
    @Email(message = "{user.email.not.valid}")
    private String email;

    /**
     * 邮箱code
     */
    @NotBlank(message = "{email.code.not.blank}", groups = {EmailGroup.class})
    private String emailCode;

    /**
     * 小程序code
     */
    @NotBlank(message = "encryptedData 不能为空", groups = {WechatGroup.class})
    private String encryptedData;

    @NotBlank(message = "iv 不能为空", groups = {WechatGroup.class})
    private String iv;

    @NotBlank(message = "iv 不能为空", groups = {WechatGroup.class})
    private String wechatLoginType; // wechat,wechat-mobile

    /**
     * 第三方登录平台
     */
    @NotBlank(message = "{social.source.not.blank}", groups = {SocialGroup.class})
    private String source;

    /**
     * 第三方登录code
     */
    @NotBlank(message = "{social.code.not.blank}", groups = {SocialGroup.class})
    private String socialCode;

    /**
     * 第三方登录socialState
     */
    @NotBlank(message = "{social.state.not.blank}", groups = {SocialGroup.class})
    private String socialState;


}
