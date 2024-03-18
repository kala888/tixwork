package com.tiandtech.mybatis.checker;

import cn.hutool.core.lang.Validator;
import cn.hutool.core.util.PhoneUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

/**
 *
 */
public class SmartValidator implements ConstraintValidator<SmartChecker, String> {

    private SmartCheckType type;

    @Override
    public void initialize(SmartChecker checker) {
        this.type = checker.type();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (StrUtil.isEmpty(value)) {
            return true;
        }

        if (type == SmartCheckType.JSON) {
            return JSONUtil.isTypeJSON(value);
        }
        if (type == SmartCheckType.MOBILE) {
            return PhoneUtil.isMobile(value);
        }
        if (type == SmartCheckType.EMAIL) {
            return Validator.isEmail(value);
        }
        if (type == SmartCheckType.CITIZEN_ID) {
            return Validator.isCitizenId(value);
        }
        if (type == SmartCheckType.CHINESE_WORD) {
            return Validator.isChinese(value);
        }
        if (type == SmartCheckType.CREDIT_CODE) {
            return Validator.isCreditCode(value);
        }
        if (type == SmartCheckType.CHINESE_NAME) {
            return Validator.isChineseName(value);
        }

        return false;
    }
}
