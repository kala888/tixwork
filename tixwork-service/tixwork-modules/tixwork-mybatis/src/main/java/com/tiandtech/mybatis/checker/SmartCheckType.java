package com.tiandtech.mybatis.checker;

public enum SmartCheckType {
    /**
     * JSON
     */
    JSON,
    /**
     * 手机号
     */
    MOBILE,
    /**
     * Email校验
     */
    EMAIL,
    /**
     * 身份证
     */
    CITIZEN_ID,
    /**
     * 中文校验
     */
    CHINESE_WORD,
    /**
     * 统一社会信用代码
     */
    CREDIT_CODE,
    /**
     * 合法的中文姓名
     */
    CHINESE_NAME,
}
