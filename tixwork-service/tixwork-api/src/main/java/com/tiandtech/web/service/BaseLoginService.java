package com.tiandtech.web.service;

import com.tiandtech.core.utils.ServletUtils;
import com.tiandtech.core.utils.SpringUtils;
import com.tiandtech.log.event.LoginEvent;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * 登录校验方法
 */
@RequiredArgsConstructor
@Slf4j
@Service
public class BaseLoginService {


    /**
     * 记录登录信息
     */
    public void saveLoginRecord(String tenantId, String username, String status, String message) {
        LoginEvent loginRecordEvent = new LoginEvent();
        loginRecordEvent.setTenantId(tenantId);
        loginRecordEvent.setUserName(username);
        loginRecordEvent.setStatus(status);
        loginRecordEvent.setMessage(message);
        HttpServletRequest request = ServletUtils.getRequest();
        try {
            loginRecordEvent.setUserAgent(request.getHeader("User-Agent"));
        } catch (Exception e) {
            log.error("获取User-Agent失败");
        }

        try {
            loginRecordEvent.setIp(ServletUtils.getClientIP());
        } catch (Exception e) {
            log.error("获取ip失败");
        }

        SpringUtils.context().publishEvent(loginRecordEvent);
    }


}
