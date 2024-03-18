package com.tiandtech.core.utils;


import cn.hutool.extra.spring.SpringUtil;
import com.tiandtech.core.config.TixworkConfig;
import com.tiandtech.core.service.MailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ToAdmin {

    protected static final Logger logger = LoggerFactory.getLogger(ToAdmin.class);
    private static final TixworkConfig tixworkConfig = SpringUtil.getBean("tixworkConfig");

    public static void say(String subject, String content) {

        MailService mailService = SpringUtil.getBean("mailService");
        try {
            if (mailService == null) {
                throw new Exception("mailService 为空, email配置问题");
            }
            mailService.sendEmail(tixworkConfig.getAdminEmail(), subject, content);
        } catch (Exception ex) {
            logger.error("发送邮件给admin失败，" + subject + ":" + content, ex);
        }
    }

    public static void withError(String title, String why, Exception e) {
        String content = why + e.getMessage();
        ToAdmin.say("律师函系统异常 异常：" + title, content);
    }

    public static void withError(String title, Exception e) {
        ToAdmin.withError(title, "", e);
    }
}
