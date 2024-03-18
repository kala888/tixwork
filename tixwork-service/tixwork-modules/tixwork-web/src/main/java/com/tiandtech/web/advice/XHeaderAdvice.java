package com.tiandtech.web.advice;

import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.extra.spring.SpringUtil;
import cn.hutool.log.Log;
import cn.hutool.log.LogFactory;
import com.tiandtech.core.constant.ViewConstants;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

@ControllerAdvice
public class XHeaderAdvice implements ResponseBodyAdvice<Object> {

    private static final Log logger = LogFactory.get();

    @Override
    public boolean supports(final MethodParameter returnType, final Class<? extends HttpMessageConverter<?>> converterType) {
        return true;
    }

    @Override
    public Object beforeBodyWrite(final Object body, final MethodParameter returnType, final MediaType selectedContentType,
                                  final Class<? extends HttpMessageConverter<?>> selectedConverterType, final ServerHttpRequest request,
                                  final ServerHttpResponse response) {
        String authorization = request.getHeaders().getFirst(ViewConstants.AUTHORIZATION);

        HttpHeaders headers = response.getHeaders();
        String xClass = headers.getFirst(ViewConstants.X_CLASS);
        if (StrUtil.isEmpty(xClass) && body != null) {
            String className = body.getClass().getCanonicalName();
            headers.add(ViewConstants.X_CLASS, className);
        }
        headers.add(ViewConstants.X_ENV_TYPE, SpringUtil.getActiveProfile());
        // 如果request中没有token，就生成一个临时token塞回去
        if (StrUtil.isEmpty(authorization) || StrUtil.replace(authorization.toLowerCase(), "bearer", "").length() < 15) {
            String token = StpUtil.getAnonTokenSession().getToken();
            headers.add(ViewConstants.AUTHORIZATION, token);
        }

        return body;
    }
}
