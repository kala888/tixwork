package com.tiandtech.web.controller;

import cn.dev33.satoken.annotation.SaIgnore;
import cn.hutool.core.date.DateUtil;
import com.tiandtech.core.config.TixworkConfig;
import com.tiandtech.core.utils.SpringUtils;
import com.tiandtech.core.utils.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.info.BuildProperties;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

/**
 * 首页
 */
@SaIgnore
@RequiredArgsConstructor
@RestController
public class IndexController {

    /**
     * 系统基础配置
     */
    private final TixworkConfig tixworkConfig;

    /**
     * 访问首页，提示语
     */
    @GetMapping("/")
    public String index() {
        BuildProperties buildInfo = SpringUtils.getBean(BuildProperties.class);
        String buildTime = DateUtil.formatDateTime(Date.from(buildInfo.getTime()));
        return StringUtils.format(
            "欢迎使用{}后台管理框架，当前版本：v{}，请通过前端地址访问。buildTime: {}",
            tixworkConfig.getName(),
            tixworkConfig.getVersion(),
            buildTime
        );
    }
}
