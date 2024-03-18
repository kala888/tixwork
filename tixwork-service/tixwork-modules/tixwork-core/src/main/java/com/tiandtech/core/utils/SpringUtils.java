package com.tiandtech.core.utils;

import cn.hutool.core.date.DateUtil;
import cn.hutool.extra.spring.SpringUtil;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.boot.info.BuildProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * spring工具类
 */
@Component
public final class SpringUtils extends SpringUtil {

    /**
     * 如果BeanFactory包含一个与所给名称匹配的bean定义，则返回true
     */
    public static boolean containsBean(String name) {
        return getBeanFactory().containsBean(name);
    }

    /**
     * 判断以给定名字注册的bean定义是一个singleton还是一个prototype。 如果与给定名字相应的bean定义没有被找到，将会抛出一个异常（NoSuchBeanDefinitionException）
     */
    public static boolean isSingleton(String name) throws NoSuchBeanDefinitionException {
        return getBeanFactory().isSingleton(name);
    }

    /**
     * @return Class 注册对象的类型
     */
    public static Class<?> getType(String name) throws NoSuchBeanDefinitionException {
        return getBeanFactory().getType(name);
    }

    /**
     * 如果给定的bean名字在bean定义中有别名，则返回这些别名
     */
    public static String[] getAliases(String name) throws NoSuchBeanDefinitionException {
        return getBeanFactory().getAliases(name);
    }

    /**
     * 获取aop代理对象
     */
    @SuppressWarnings("unchecked")
    public static <T> T getAopProxy(T invoker) {
        return (T) AopContext.currentProxy();
    }


    /**
     * 获取spring上下文
     */
    public static ApplicationContext context() {
        return getApplicationContext();
    }


    public static final String ANSI_RESET = "\u001B[0m";
    public static final String ANSI_YELLOW = "\033[1;93m";

    private static void printLine(String text) {
        System.out.println(ANSI_YELLOW + text + ANSI_RESET);
    }

    public static void started() {

        BuildProperties buildInfo = getBean(BuildProperties.class);
        String activeProfile = getActiveProfile();
        String buildTime = DateUtil.formatDateTime(Date.from(buildInfo.getTime()));
        String appName = buildInfo.getName();

        Environment env = getApplicationContext().getEnvironment();
        String contextPath = env.getProperty("server.servlet.context-path");
        String serverPort = env.getProperty("server.port");

        String localPath = " http://localhost:" + serverPort + contextPath;

        String tips = String.format(
            "\n\t %s 启动成功,\t 访问地址: %s" +
                "\n\t active profile: %s,\t build time: %s",
            appName, localPath,
            activeProfile, buildTime
        );
        printLine(tips);
        printLine("\n" +
            "                (____) \n" +
            "                 (oo) \n" +
            "          /-------\\/    ~哞儿~~~~\n " +
            "         / ||    ||   \n" +
            "        *  ||----||   \n" +
            "           ~~    ~~   \n");
    }

    public static boolean isProduction() {
        String activeProfile = getActiveProfile();
        return "prod".equalsIgnoreCase(activeProfile)
            || "production".equalsIgnoreCase(activeProfile);
    }

}
