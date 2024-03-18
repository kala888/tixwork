package com.tiandtech.web.service;

import cn.dev33.satoken.secure.BCrypt;
import cn.hutool.core.util.RandomUtil;
import com.tiandtech.base.enums.GenderType;
import com.tiandtech.core.constant.Constants;
import com.tiandtech.core.constant.GlobalConstants;
import com.tiandtech.core.domain.model.RegisterBody;
import com.tiandtech.core.enums.UserType;
import com.tiandtech.core.exception.user.CaptchaException;
import com.tiandtech.core.exception.user.CaptchaExpireException;
import com.tiandtech.core.exception.user.UserException;
import com.tiandtech.core.utils.MapstructUtils;
import com.tiandtech.core.utils.MessageUtils;
import com.tiandtech.core.utils.StringUtils;
import com.tiandtech.encrypt.utils.PasswordUtils;
import com.tiandtech.redis.RedisUtils;
import com.tiandtech.system.domain.SysUser;
import com.tiandtech.system.domain.bo.SysUserBo;
import com.tiandtech.system.domain.vo.SysUserVo;
import com.tiandtech.system.service.SysUserService;
import com.tiandtech.web.config.properties.CaptchaProperties;
import com.tiandtech.wechat.domain.WxUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * 注册校验方法
 */
@RequiredArgsConstructor
@Service
public class SysRegisterService extends BaseLoginService {

    private final SysUserService userService;
    private final CaptchaProperties captchaProperties;


    public SysUserVo register(WxUser wxUser) {
        String userName = "wx@" + RandomUtil.randomInt(1000000, 9999999);
        String tenantId = "100000";
        // 校验用户类型是否存在
        String userType = UserType.APP_USER.getUserType();

        SysUserBo sysUserBo = new SysUserBo();
        sysUserBo.setUserName(userName);
        sysUserBo.setNickName(wxUser.getNickName());
        sysUserBo.setOpenId(wxUser.getOpenid());
        sysUserBo.setUnionId(wxUser.getUnionId());
//        sysUserBo.setAvatar(wxUser.getAvatarUrl());
        sysUserBo.setGender("0".equalsIgnoreCase(wxUser.getGender()) ? GenderType.MALE : GenderType.FEMALE);
        sysUserBo.setPassword(BCrypt.hashpw(PasswordUtils.randomPassword()));
        sysUserBo.setUserType(userType);
        sysUserBo.setMobile(wxUser.getMobile());

        if (!userService.checkUserNameUnique(sysUserBo)) {
            throw new UserException("user.register.save.error", userName);
        }
        SysUser sysUser = userService.registerUser(sysUserBo, tenantId);
        if (sysUser == null) {
            throw new UserException("user.register.error");
        }
        saveLoginRecord(tenantId, userName, Constants.REGISTER, MessageUtils.message("user.register.success"));
        return MapstructUtils.convert(sysUser, SysUserVo.class);
    }

    /**
     * 注册
     */
    public void register(RegisterBody registerBody) {
        String tenantId = registerBody.getTenantId();
        String userName = registerBody.getUserName();
        String password = registerBody.getPassword();
        // 校验用户类型是否存在
        String userType = UserType.getUserType(registerBody.getUserType()).getUserType();

        boolean captchaEnabled = captchaProperties.getEnable();
        // 验证码开关
        if (captchaEnabled) {
            validateCaptcha(tenantId, userName, registerBody.getCode(), registerBody.getUuid());
        }
        SysUserBo sysUserBo = new SysUserBo();
        sysUserBo.setUserName(userName);
        sysUserBo.setNickName(userName);
        sysUserBo.setPassword(BCrypt.hashpw(password));
        sysUserBo.setUserType(userType);

        if (!userService.checkUserNameUnique(sysUserBo)) {
            throw new UserException("user.register.save.error", userName);
        }
        SysUser sysUser = userService.registerUser(sysUserBo, tenantId);
        if (sysUser == null) {
            throw new UserException("user.register.error");
        }
        saveLoginRecord(tenantId, userName, Constants.REGISTER, MessageUtils.message("user.register.success"));
    }

    /**
     * 校验验证码
     *
     * @param username 用户名
     * @param code     验证码
     * @param uuid     唯一标识
     */
    public void validateCaptcha(String tenantId, String username, String code, String uuid) {
        String verifyKey = GlobalConstants.CAPTCHA_CODE_KEY + StringUtils.defaultString(uuid, "");
        String captcha = RedisUtils.getCacheObject(verifyKey);
        RedisUtils.deleteObject(verifyKey);
        if (captcha == null) {
            saveLoginRecord(tenantId, username, Constants.REGISTER, MessageUtils.message("user.jcaptcha.expire"));
            throw new CaptchaExpireException();
        }
        if (!code.equalsIgnoreCase(captcha)) {
            saveLoginRecord(tenantId, username, Constants.REGISTER, MessageUtils.message("user.jcaptcha.error"));
            throw new CaptchaException();
        }
    }

}
