package com.xxl.job.admin.controller.interceptor;

import com.xxl.job.admin.core.util.FtlUtil;
import com.xxl.job.admin.core.util.I18nUtil;

import java.util.HashMap;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.AsyncHandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/**
 * push cookies to model as cookieMap
 * <p>
 * tixwork
 */
@Component
public class CookieInterceptor implements AsyncHandlerInterceptor {

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {

        // cookie
        if (modelAndView != null && request.getCookies() != null && request.getCookies().length > 0) {
            HashMap<String, Cookie> cookieMap = new HashMap<String, Cookie>();
            for (Cookie ck : request.getCookies()) {
                cookieMap.put(ck.getName(), ck);
            }
            modelAndView.addObject("cookieMap", cookieMap);
        }

        // static method
        if (modelAndView != null) {
            modelAndView.addObject("I18nUtil", FtlUtil.generateStaticModel(I18nUtil.class.getName()));
        }

    }

}
