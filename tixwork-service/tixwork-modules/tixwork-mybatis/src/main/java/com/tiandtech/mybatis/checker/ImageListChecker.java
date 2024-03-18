package com.tiandtech.mybatis.checker;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.RetentionPolicy.RUNTIME;

/**
 * 手机验证
 */
@Target({ElementType.PARAMETER, ElementType.FIELD, ElementType.TYPE})
@Retention(RUNTIME)
@Documented
@Constraint(validatedBy = {ImageListValidator.class})
public @interface ImageListChecker {

    String message() default "图片不正确";

    int max() default 1;

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
