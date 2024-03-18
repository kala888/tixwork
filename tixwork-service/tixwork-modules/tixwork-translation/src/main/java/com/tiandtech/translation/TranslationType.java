package com.tiandtech.translation;

import java.lang.annotation.*;

/**
 * 翻译类型注解 (标注到{@link TranslationInterface} 的实现类)
 */
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
@Documented
public @interface TranslationType {

    /**
     * 类型
     */
    String type();

}
