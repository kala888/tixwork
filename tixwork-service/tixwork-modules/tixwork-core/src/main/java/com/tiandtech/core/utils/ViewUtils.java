package com.tiandtech.core.utils;


import com.tiandtech.core.constant.ViewConstants;

public class ViewUtils {

    /**
     * 设置X-Class到response header
     *
     * @param xClass
     */
    public static void setResponseView(String xClass) {
        ServletUtils.getResponse().setHeader(ViewConstants.X_CLASS, xClass);
    }

    /**
     * 设置X-Class到response header
     *
     * @param obj
     */
    public static void setResponseView(Object obj) {
        boolean isClass = obj instanceof Class;
        String className = isClass ? ((Class) obj).getCanonicalName() : obj.getClass().getCanonicalName();
        ServletUtils.getResponse().setHeader(ViewConstants.X_CLASS, className);
    }

    /**
     * 设置 X-Navigation-Method到response header 前端路由跳转指示
     *
     * @param xNavigation
     */
    public static void setXNavigation(String xNavigation) {
        ServletUtils.getResponse().setHeader(ViewConstants.X_NAVIGATION_METHOD, xNavigation);
    }
}
