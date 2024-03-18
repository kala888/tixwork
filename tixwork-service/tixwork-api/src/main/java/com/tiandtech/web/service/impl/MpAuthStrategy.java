package com.tiandtech.web.service.impl;


import cn.dev33.satoken.stp.SaLoginModel;
import cn.dev33.satoken.stp.StpUtil;
import com.tiandtech.core.constant.Constants;
import com.tiandtech.core.domain.model.LoginBody;
import com.tiandtech.core.domain.model.MiniProgramLoginUser;
import com.tiandtech.core.enums.UserStatus;
import com.tiandtech.core.exception.BizException;
import com.tiandtech.core.utils.MessageUtils;
import com.tiandtech.core.utils.ValidatorUtils;
import com.tiandtech.core.validate.auth.WechatGroup;
import com.tiandtech.satoken.LoginHelper;
import com.tiandtech.system.domain.SysClient;
import com.tiandtech.system.domain.vo.SysUserVo;
import com.tiandtech.system.service.SysUserService;
import com.tiandtech.web.domain.vo.LoginVo;
import com.tiandtech.web.service.AuthStrategy;
import com.tiandtech.web.service.SysLoginService;
import com.tiandtech.web.service.SysRegisterService;
import com.tiandtech.wechat.domain.WxUser;
import com.tiandtech.wechat.service.WxLoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


/**
 * 邮件认证策略
 */
@Slf4j
@Service("mp" + AuthStrategy.BASE_NAME)
@RequiredArgsConstructor
public class MpAuthStrategy implements AuthStrategy {

    private final SysLoginService loginService;
    private final WxLoginService wxLoginService;
    private final SysRegisterService registerService;
    private final SysUserService userService;

    @Override
    public void validate(LoginBody loginBody) {
        ValidatorUtils.validate(loginBody, WechatGroup.class);
    }

    @Override
    public LoginVo login(String clientId, LoginBody loginBody, SysClient client) {
        // code 为 小程序调用 wx.login 授权后获取
        String code = loginBody.getCode();
        String encryptedData = loginBody.getEncryptedData();
        String iv = loginBody.getIv();
        boolean isMobileLogin = "wechat-mobile".equalsIgnoreCase(loginBody.getWechatLoginType());
        WxUser wxUser = null;
        if (isMobileLogin) {
            wxUser = wxLoginService.loginWithMobile(code, encryptedData, iv);
        } else {
            wxUser = wxLoginService.login(code, encryptedData, iv);
        }
        SysUserVo user = loadUserByOpenid(wxUser);

        String openId = wxUser.getOpenid();
        // 此处可根据登录用户的数据不同 自行创建 loginUser 属性不够用继承扩展就行了
        MiniProgramLoginUser loginUser = new MiniProgramLoginUser();
        loginUser.setTenantId(user.getTenantId());
        loginUser.setUserId(user.getUserId());
        loginUser.setUserName(user.getUserName());
        loginUser.setNickName(user.getNickName());
        loginUser.setUserType(user.getUserType());
        loginUser.setOpenid(openId);

        SaLoginModel model = new SaLoginModel();
        model.setDevice(client.getDeviceType());
        // 自定义分配 不同用户体系 不同 token 授权时间 不设置默认走全局 yml 配置
        // 例如: 后台用户30分钟过期 app用户1天过期
        model.setTimeout(client.getTimeout());
        model.setActiveTimeout(client.getActiveTimeout());
        model.setExtra(LoginHelper.CLIENT_KEY, clientId);
        // 生成token
        LoginHelper.login(loginUser, model);

        loginService.saveLoginRecord(loginUser.getTenantId(), user.getUserName(), Constants.LOGIN_SUCCESS,
            MessageUtils.message("user.login.success"));
        loginService.saveLoginInfoToUser(user.getUserId());

        LoginVo loginVo = new LoginVo();
        loginVo.setAccessToken(StpUtil.getTokenValue());
        loginVo.setExpireIn(StpUtil.getTokenTimeout());
        loginVo.setClientId(clientId);
        loginVo.setOpenid(openId);
        return loginVo;
    }

    private SysUserVo loadUserByOpenid(WxUser wxUser) {
        String openId = wxUser.getOpenid();
        SysUserVo user = userService.selectUserByOpenId(openId);
        if (user == null) {
            user = registerService.register(wxUser);
        }
        if (UserStatus.DISABLE.getCode().equals(user.getStatus())) {
            log.info("登录用户：{} 已被停用.", openId);
            throw new BizException("用户已停用，请联系管理员启用用户");
        }
        return user;
    }

}
