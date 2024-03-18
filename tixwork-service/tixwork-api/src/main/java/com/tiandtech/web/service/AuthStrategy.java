package com.tiandtech.web.service;


import com.tiandtech.core.domain.model.LoginBody;
import com.tiandtech.core.exception.ServiceException;
import com.tiandtech.core.utils.SpringUtils;
import com.tiandtech.system.domain.SysClient;
import com.tiandtech.web.domain.vo.LoginVo;

/**
 * 授权策略
 */
public interface AuthStrategy {

    String BASE_NAME = "AuthStrategy";

    /**
     * 登录
     */
    static LoginVo login(LoginBody loginBody, SysClient client) {
        // 授权类型和客户端id
        String clientId = loginBody.getClientId();
        String grantType = loginBody.getGrantType();
        String beanName = grantType + BASE_NAME;
        if (!SpringUtils.containsBean(beanName)) {
            throw new ServiceException("授权类型不正确!");
        }
        AuthStrategy instance = SpringUtils.getBean(beanName);
        instance.validate(loginBody);
        return instance.login(clientId, loginBody, client);
    }

    /**
     * 参数校验
     */
    void validate(LoginBody loginBody);

    /**
     * 登录
     */
    LoginVo login(String clientId, LoginBody loginBody, SysClient client);

}
