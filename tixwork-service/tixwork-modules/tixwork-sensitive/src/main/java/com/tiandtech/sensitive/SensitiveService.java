package com.tiandtech.sensitive;

/**
 * 脱敏服务 默认管理员不过滤 需自行根据业务重写实现
 */
public interface SensitiveService {

    /**
     * 是否脱敏
     */
    boolean isSensitive();

}
