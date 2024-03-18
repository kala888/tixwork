package com.tiandtech.core.exception.file;

import com.tiandtech.core.exception.base.BaseException;

import java.io.Serial;

/**
 * 文件信息异常类
 */
public class FileException extends BaseException {

    @Serial
    private static final long serialVersionUID = 1L;

    public FileException(String code, Object[] args) {
        super("file", code, args, null);
    }

}
