package com.tiandtech.mybatis.checker;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.RetentionPolicy.RUNTIME;

/**
 * 包装Hutools的Validator
 */
@Target({ElementType.PARAMETER, ElementType.FIELD, ElementType.TYPE})
@Retention(RUNTIME)
@Documented
@Constraint(validatedBy = {SmartValidator.class})
public @interface SmartChecker {

    String message() default "不正确的数据格式";

    SmartCheckType type();

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
