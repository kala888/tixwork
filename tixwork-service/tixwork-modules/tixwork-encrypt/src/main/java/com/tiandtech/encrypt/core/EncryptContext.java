package com.tiandtech.encrypt.core;

import com.tiandtech.encrypt.enumd.AlgorithmType;
import com.tiandtech.encrypt.enumd.EncodeType;
import lombok.Data;

/**
 * 加密上下文 用于encryptor传递必要的参数。
 */
@Data
public class EncryptContext {

    /**
     * 默认算法
     */
    private AlgorithmType algorithm;

    /**
     * 安全秘钥
     */
    private String password;

    /**
     * 公钥
     */
    private String publicKey;

    /**
     * 私钥
     */
    private String privateKey;

    /**
     * 编码方式，base64/hex
     */
    private EncodeType encode;

}
