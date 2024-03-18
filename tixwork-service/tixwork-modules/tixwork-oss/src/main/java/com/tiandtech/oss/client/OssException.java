package com.tiandtech.oss.client;

import java.io.Serial;

/**
 * OSS异常类
 */
public class OssException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public OssException(String msg) {
        super(msg);
    }

}
