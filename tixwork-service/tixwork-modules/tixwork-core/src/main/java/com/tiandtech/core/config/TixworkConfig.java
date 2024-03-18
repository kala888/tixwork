package com.tiandtech.core.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * 读取项目相关配置
 */

@Data
@Component
@ConfigurationProperties(prefix = "tixwork")
public class TixworkConfig {

    private String name;
    private String version;
    private String copyrightYear;

    private String adminEmail;
    private String adminMobile;

}
