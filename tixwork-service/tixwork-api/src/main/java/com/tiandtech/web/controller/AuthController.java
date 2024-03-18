package com.tiandtech.web.controller;

import cn.dev33.satoken.annotation.SaIgnore;
import cn.hutool.core.collection.ListUtil;
import cn.hutool.core.util.ObjectUtil;
import com.tiandtech.base.candidatevalule.CandidateValue;
import com.tiandtech.core.domain.WebResult;
import com.tiandtech.core.domain.model.LoginBody;
import com.tiandtech.core.domain.model.RegisterBody;
import com.tiandtech.core.utils.MessageUtils;
import com.tiandtech.core.utils.StringUtils;
import com.tiandtech.system.domain.SysClient;
import com.tiandtech.system.domain.bo.SysTenantBo;
import com.tiandtech.system.domain.vo.SysTenantVo;
import com.tiandtech.system.service.SysClientService;
import com.tiandtech.system.service.SysConfigService;
import com.tiandtech.system.service.SysTenantService;
import com.tiandtech.tenant.helper.TenantHelper;
import com.tiandtech.web.domain.vo.LoginVo;
import com.tiandtech.web.service.AuthStrategy;
import com.tiandtech.web.service.SysLoginService;
import com.tiandtech.web.service.SysRegisterService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URL;
import java.util.List;

/**
 * 认证
 */
@Slf4j
@SaIgnore
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final SysLoginService loginService;
    private final SysRegisterService registerService;
    private final SysConfigService configService;
    private final SysTenantService tenantService;
    private final SysClientService clientService;

    /**
     * 登录方法
     *
     * @param loginBody 登录信息
     * @return 结果
     */
    @PostMapping("/login")
    public WebResult<LoginVo> login(@Validated @RequestBody LoginBody loginBody) {
        // 授权类型和客户端id
        String clientId = loginBody.getClientId();
        String grantType = loginBody.getGrantType();
        SysClient client = clientService.queryByClientId(clientId);
        // 查询不到 client 或 client 内不包含 grantType
        if (ObjectUtil.isNull(client) || !StringUtils.contains(client.getGrantType(), grantType)) {
            log.info("客户端id: {} 认证类型：{} 异常!.", clientId, grantType);
            return WebResult.error(MessageUtils.message("auth.grant.type.error"));
        }
        // 校验租户
        loginService.checkTenant(loginBody.getTenantId());
        // 登录
        LoginVo result = AuthStrategy.login(loginBody, client);
        return WebResult.success(result);
    }

    /**
     * 退出登录
     */
    @PostMapping("/logout")
    public WebResult<String> logout() {
        loginService.logout();
        return WebResult.success("退出成功");
    }

    /**
     * 用户注册
     */
    @PostMapping("/register")
    public WebResult<Void> register(@Validated @RequestBody RegisterBody user) {
        if (!configService.selectRegisterEnabled(user.getTenantId())) {
            return WebResult.error("当前系统没有开启注册功能！");
        }
        registerService.register(user);
        return WebResult.success();
    }


    /**
     * 登录页面租户下拉框
     * <p>
     * TODO 多租户下，应该启动二级域名机制，不然有潜在安全问题。
     *
     * @return 租户列表
     */
    @PostMapping("/tenant/list")
    public WebResult.TableDataInfo<CandidateValue> tenantList(HttpServletRequest request) throws Exception {
        if (!TenantHelper.isEnable()) {
            return WebResult.success(ListUtil.empty());
        }
        List<SysTenantVo> tenantList = tenantService.list(new SysTenantBo());
        // 获取域名
        String host;
        String referer = request.getHeader("referer");
        if (StringUtils.isNotBlank(referer)) {
            // 这里从referer中取值是为了本地使用hosts添加虚拟域名，方便本地环境调试
            host = referer.split("//")[1].split("/")[0];
        } else {
            host = new URL(request.getRequestURL().toString()).getHost();
        }
        // 根据域名进行筛选
        List<CandidateValue> list = tenantList.stream().filter(vo -> StringUtils.equals(vo.getDomain(), host))
            .map(it -> CandidateValue.builder().id(it.getTenantId()).title(it.getCompanyName()).build()).toList();
        return WebResult.success(list);
    }

}
