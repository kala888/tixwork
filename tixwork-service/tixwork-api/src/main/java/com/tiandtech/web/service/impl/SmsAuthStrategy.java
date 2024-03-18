package com.tiandtech.web.service.impl;

import cn.dev33.satoken.stp.SaLoginModel;
import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.tiandtech.core.constant.Constants;
import com.tiandtech.core.constant.GlobalConstants;
import com.tiandtech.core.domain.model.LoginBody;
import com.tiandtech.core.domain.model.LoginUser;
import com.tiandtech.core.enums.LoginType;
import com.tiandtech.core.enums.UserStatus;
import com.tiandtech.core.exception.user.CaptchaExpireException;
import com.tiandtech.core.exception.user.UserException;
import com.tiandtech.core.utils.MessageUtils;
import com.tiandtech.core.utils.StringUtils;
import com.tiandtech.core.utils.ValidatorUtils;
import com.tiandtech.core.validate.auth.SmsGroup;
import com.tiandtech.redis.RedisUtils;
import com.tiandtech.satoken.LoginHelper;
import com.tiandtech.system.domain.SysClient;
import com.tiandtech.system.domain.SysUser;
import com.tiandtech.system.domain.vo.SysUserVo;
import com.tiandtech.system.mapper.SysUserMapper;
import com.tiandtech.tenant.helper.TenantHelper;
import com.tiandtech.web.domain.vo.LoginVo;
import com.tiandtech.web.service.AuthStrategy;
import com.tiandtech.web.service.SysLoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


/**
 * 短信认证策略
 */
@Slf4j
@Service("sms" + AuthStrategy.BASE_NAME)
@RequiredArgsConstructor
public class SmsAuthStrategy implements AuthStrategy {

    private final SysLoginService loginService;
    private final SysUserMapper userMapper;

    @Override
    public void validate(LoginBody loginBody) {
        ValidatorUtils.validate(loginBody, SmsGroup.class);
    }

    @Override
    public LoginVo login(String clientId, LoginBody loginBody, SysClient client) {
        String tenantId = loginBody.getTenantId();
        String mobile = loginBody.getMobile();
        String smsCode = loginBody.getSmsCode();

        // 通过手机号查找用户
        SysUserVo user = loadUserByPhonenumber(tenantId, mobile);

        loginService.checkLogin(LoginType.SMS, tenantId, user.getUserName(), () -> !validateSmsCode(tenantId, mobile, smsCode));
        // 此处可根据登录用户的数据不同 自行创建 loginUser 属性不够用继承扩展就行了
        LoginUser loginUser = loginService.buildLoginUser(user);
        SaLoginModel model = new SaLoginModel();
        model.setDevice(client.getDeviceType());
        // 自定义分配 不同用户体系 不同 token 授权时间 不设置默认走全局 yml 配置
        // 例如: 后台用户30分钟过期 app用户1天过期
        model.setTimeout(client.getTimeout());
        model.setActiveTimeout(client.getActiveTimeout());
        model.setExtra(LoginHelper.CLIENT_KEY, clientId);
        // 生成token
        LoginHelper.login(loginUser, model);

        loginService.saveLoginRecord(loginUser.getTenantId(), user.getUserName(), Constants.LOGIN_SUCCESS, MessageUtils.message("user.login.success"));
        loginService.saveLoginInfoToUser(user.getUserId());

        LoginVo loginVo = new LoginVo();
        loginVo.setAccessToken(StpUtil.getTokenValue());
        loginVo.setExpireIn(StpUtil.getTokenTimeout());
        loginVo.setClientId(clientId);
        return loginVo;
    }

    /**
     * 校验短信验证码
     */
    private boolean validateSmsCode(String tenantId, String mobile, String smsCode) {
        String code = RedisUtils.getCacheObject(GlobalConstants.CAPTCHA_CODE_KEY + mobile);
        if (StringUtils.isBlank(code)) {
            loginService.saveLoginRecord(tenantId, mobile, Constants.LOGIN_FAIL, MessageUtils.message("user.jcaptcha.expire"));
            throw new CaptchaExpireException();
        }
        return code.equals(smsCode);
    }

    private SysUserVo loadUserByPhonenumber(String tenantId, String mobile) {
        SysUser user = userMapper.selectOne(new LambdaQueryWrapper<SysUser>()
            .select(SysUser::getMobile, SysUser::getStatus)
            .eq(TenantHelper.isEnable(), SysUser::getTenantId, tenantId)
            .eq(SysUser::getMobile, mobile));
        if (ObjectUtil.isNull(user)) {
            log.info("登录用户：{} 不存在.", mobile);
            throw new UserException("user.not.exists", mobile);
        } else if (UserStatus.DISABLE.getCode().equals(user.getStatus())) {
            log.info("登录用户：{} 已被停用.", mobile);
            throw new UserException("user.blocked", mobile);
        }
        if (TenantHelper.isEnable()) {
            return userMapper.selectTenantUserByMobile(mobile, tenantId);
        }
        return userMapper.selectUserByMobile(mobile);
    }

}
