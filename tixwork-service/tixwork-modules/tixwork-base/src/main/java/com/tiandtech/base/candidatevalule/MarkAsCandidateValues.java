package com.tiandtech.base.candidatevalule;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 把一个枚举标记成一个可以被CandidateValueUtils组装成candidateValues的玩意
 * <p>
 * 枚举需要public String getValue() 这个方法
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface MarkAsCandidateValues {

}
