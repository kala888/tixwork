package com.tiandtech.web.controller;

import cn.dev33.satoken.annotation.SaIgnore;
import cn.hutool.captcha.AbstractCaptcha;
import cn.hutool.captcha.generator.CodeGenerator;
import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.RandomUtil;
import com.tiandtech.core.constant.Constants;
import com.tiandtech.core.constant.GlobalConstants;
import com.tiandtech.core.domain.WebResult;
import com.tiandtech.core.utils.SpringUtils;
import com.tiandtech.core.utils.StringUtils;
import com.tiandtech.core.utils.reflect.ReflectUtils;
import com.tiandtech.mail.MailProperties;
import com.tiandtech.mail.MailUtils;
import com.tiandtech.redis.RedisUtils;
import com.tiandtech.web.config.properties.CaptchaProperties;
import com.tiandtech.web.domain.vo.CaptchaVo;
import com.tiandtech.web.enums.CaptchaType;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.dromara.sms4j.api.SmsBlend;
import org.dromara.sms4j.api.entity.SmsResponse;
import org.dromara.sms4j.core.factory.SmsFactory;
import org.dromara.sms4j.provider.enumerate.SupplierType;
import org.springframework.expression.Expression;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.LinkedHashMap;

/**
 * 验证码操作处理
 */
@SaIgnore
@Slf4j
@Validated
@RequiredArgsConstructor
@RestController
public class CaptchaController {

    private final CaptchaProperties captchaProperties;
    private final MailProperties mailProperties;

    /**
     * 短信验证码
     *
     * @param mobile 用户手机号
     */
    @GetMapping("/resource/sms/code")
    public WebResult<Void> smsCode(@NotBlank(message = "{user.mobile.not.blank}") String mobile) {
        String key = GlobalConstants.CAPTCHA_CODE_KEY + mobile;
        String code = RandomUtil.randomNumbers(4);
        RedisUtils.setCacheObject(key, code, Duration.ofMinutes(Constants.CAPTCHA_EXPIRATION));
        // 验证码模板id 自行处理 (查数据库或写死均可)
        String templateId = "";
        LinkedHashMap<String, String> map = new LinkedHashMap<>(1);
        map.put("code", code);
        SmsBlend smsBlend = SmsFactory.createSmsBlend(SupplierType.ALIBABA);
        SmsResponse smsResponse = smsBlend.sendMessage(mobile, templateId, map);
        if (!"OK".equals(smsResponse.getCode())) {
            log.error("验证码短信发送异常 => {}", smsResponse);
            return WebResult.error(smsResponse.getMessage());
        }
        return WebResult.success();
    }

    /**
     * 邮箱验证码
     *
     * @param email 邮箱
     */
    @GetMapping("/resource/email/code")
    public WebResult<Void> emailCode(@NotBlank(message = "{user.email.not.blank}") String email) {
        if (!mailProperties.getEnabled()) {
            return WebResult.error("当前系统没有开启邮箱功能！");
        }
        String key = GlobalConstants.CAPTCHA_CODE_KEY + email;
        String code = RandomUtil.randomNumbers(4);
        RedisUtils.setCacheObject(key, code, Duration.ofMinutes(Constants.CAPTCHA_EXPIRATION));
        try {
            MailUtils.sendText(email, "登录验证码",
                "您本次验证码为：" + code + "，有效性为" + Constants.CAPTCHA_EXPIRATION + "分钟，请尽快填写。");
        } catch (Exception e) {
            log.error("验证码短信发送异常 => {}", e.getMessage());
            return WebResult.error(e.getMessage());
        }
        return WebResult.success();
    }

    /**
     * 生成验证码
     */
    @GetMapping("/auth/code")
    public WebResult<CaptchaVo> getCode() {
        CaptchaVo captchaVo = new CaptchaVo();
        boolean captchaEnabled = captchaProperties.getEnable();
        if (!captchaEnabled) {
            captchaVo.setCaptchaEnabled(false);
            return WebResult.success(captchaVo);
        }
        // 保存验证码信息
        String uuid = IdUtil.simpleUUID();
        String verifyKey = GlobalConstants.CAPTCHA_CODE_KEY + uuid;
        // 生成验证码
        CaptchaType captchaType = captchaProperties.getType();
        boolean isMath = CaptchaType.MATH == captchaType;
        Integer length = isMath ? captchaProperties.getNumberLength() : captchaProperties.getCharLength();
        CodeGenerator codeGenerator = ReflectUtils.newInstance(captchaType.getClazz(), length);
        AbstractCaptcha captcha = SpringUtils.getBean(captchaProperties.getCategory().getClazz());
        captcha.setGenerator(codeGenerator);
        captcha.createCode();
        String code = captcha.getCode();
        if (isMath) {
            ExpressionParser parser = new SpelExpressionParser();
            Expression exp = parser.parseExpression(StringUtils.remove(code, "="));
            code = exp.getValue(String.class);
        }
        RedisUtils.setCacheObject(verifyKey, code, Duration.ofMinutes(Constants.CAPTCHA_EXPIRATION));
        captchaVo.setUuid(uuid);
        captchaVo.setImg(captcha.getImageBase64());
        return WebResult.success(captchaVo);
    }

}
