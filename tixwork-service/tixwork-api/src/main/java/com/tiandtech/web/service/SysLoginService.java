package com.tiandtech.web.service;

import cn.dev33.satoken.exception.NotLoginException;
import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import com.tiandtech.core.constant.Constants;
import com.tiandtech.core.constant.GlobalConstants;
import com.tiandtech.core.constant.TenantConstants;
import com.tiandtech.core.domain.dto.RoleDTO;
import com.tiandtech.core.domain.model.LoginUser;
import com.tiandtech.core.enums.LoginType;
import com.tiandtech.core.enums.TenantStatus;
import com.tiandtech.core.exception.BizException;
import com.tiandtech.core.exception.user.UserException;
import com.tiandtech.core.utils.DateUtils;
import com.tiandtech.core.utils.MessageUtils;
import com.tiandtech.core.utils.ServletUtils;
import com.tiandtech.mybatis.annotation.DataPermissionIgnore;
import com.tiandtech.redis.RedisUtils;
import com.tiandtech.satoken.LoginHelper;
import com.tiandtech.system.domain.SysUser;
import com.tiandtech.system.domain.vo.SysTenantVo;
import com.tiandtech.system.domain.vo.SysUserVo;
import com.tiandtech.system.mapper.SysUserMapper;
import com.tiandtech.system.service.SysPermissionService;
import com.tiandtech.system.service.SysTenantService;
import com.tiandtech.tenant.exception.TenantException;
import com.tiandtech.tenant.helper.TenantHelper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Date;
import java.util.List;
import java.util.function.Supplier;

/**
 * 登录校验方法
 */
@RequiredArgsConstructor
@Slf4j
@Service
public class SysLoginService extends BaseLoginService {


    @Value("${user.password.maxRetryCount}")
    private Integer maxRetryCount;

    @Value("${user.password.lockTime}")
    private Integer lockTime;

    private final SysTenantService tenantService;
    private final SysPermissionService permissionService;
    private final SysUserMapper userMapper;

    /**
     * 退出登录
     */
    public void logout() {
        try {
            LoginUser loginUser = LoginHelper.getLoginUser();
            if (TenantHelper.isEnable() && LoginHelper.isSuperAdmin()) {
                // 超级管理员 登出清除动态租户
                TenantHelper.clearDynamic();
            }
            saveLoginRecord(loginUser.getTenantId(), loginUser.getUserName(), Constants.LOGOUT,
                MessageUtils.message("user.logout.success"));
        } catch (NotLoginException ignored) {
        } finally {
            try {
                StpUtil.logout();
            } catch (NotLoginException ignored) {
            }
        }
    }

    /**
     * 构建登录用户
     */
    public LoginUser buildLoginUser(SysUserVo user) {
        LoginUser loginUser = new LoginUser();
        loginUser.setTenantId(user.getTenantId());
        loginUser.setUserId(user.getUserId());
        loginUser.setDeptId(user.getDeptId());
        loginUser.setUserName(user.getUserName());
        loginUser.setNickName(user.getNickName());
        loginUser.setUserType(user.getUserType());
        loginUser.setMenuPermission(permissionService.getMenuPermission(user.getUserId()));
        loginUser.setRolePermission(permissionService.getRolePermission(user.getUserId()));
        loginUser.setDeptName(ObjectUtil.isNull(user.getDept()) ? "" : user.getDept().getDeptName());

        List<RoleDTO> roles = BeanUtil.copyToList(user.getRoles(), RoleDTO.class);
        loginUser.setRoles(roles);
        return loginUser;
    }

    /**
     * 记录登录信息
     *
     * @param userId 用户ID
     */
    @DataPermissionIgnore
    public void saveLoginInfoToUser(Long userId) {
        SysUser sysUser = new SysUser();
        sysUser.setId(userId);
        sysUser.setLoginIp(ServletUtils.getClientIP());
        sysUser.setLoginDate(DateUtils.getNowDate());
        sysUser.setUpdateBy(userId);
        userMapper.updateById(sysUser);
    }

    /**
     * 登录校验
     */
    public void checkLogin(LoginType loginType, String tenantId, String username, Supplier<Boolean> supplier) {
        try {
            String errorKey = GlobalConstants.PWD_ERR_CNT_KEY + username;

            // 获取用户登录错误次数，默认为0 (可自定义限制策略 例如: key + username + ip)
            int errorNumber = ObjectUtil.defaultIfNull(RedisUtils.getCacheObject(errorKey), 0);
            // 锁定时间内登录 则踢出
            if (errorNumber >= maxRetryCount) {
                throw new UserException(loginType.getRetryLimitExceed(), maxRetryCount, lockTime);
            }

            if (supplier.get()) {
                // 错误次数递增
                errorNumber++;
                RedisUtils.setCacheObject(errorKey, errorNumber, Duration.ofMinutes(lockTime));
                // 达到规定错误次数 则锁定登录
                if (errorNumber >= maxRetryCount) {
                    throw new UserException(loginType.getRetryLimitExceed(), maxRetryCount, lockTime);
                } else {
                    // 未达到规定错误次数
                    throw new UserException(loginType.getRetryLimitCount(), errorNumber, maxRetryCount - errorNumber);
                }
            }
            // 登录成功 清空错误次数
            RedisUtils.deleteObject(errorKey);
        } catch (UserException e) {
            saveLoginRecord(tenantId, username, Constants.LOGIN_FAIL, e.getMessage());
            throw e;
        }
    }


    public void checkTenant(String tenantId) {

        String userTenantId = LoginHelper.getTenantId();
//        String userTenantId = user.getTenantId();

        boolean superAdmin = LoginHelper.isSuperAdmin();
        //1.  未开启跳过,superAdmin也跳过，系统用户登录default租户跳过
        if (!TenantHelper.isEnable() || superAdmin || TenantConstants.DEFAULT_TENANT_ID.equals(tenantId) && StrUtil.isEmpty(
            userTenantId)) {
            return;
        }
        //2 非superAdmin

        //2.1 要登录某个特定租户，校验租户状态
        if (StrUtil.isNotEmpty(tenantId)) {
            SysTenantVo tenant = tenantService.getByTenantId(tenantId);
            if (ObjectUtil.isNull(tenant)) {
                log.info("登录租户：{} 不存在.", tenantId);
                throw new TenantException("tenant.not.exists");
            } else if (TenantStatus.DISABLE.getCode().equals(tenant.getStatus())) {
                log.info("登录租户：{} 已被停用.", tenantId);
                throw new TenantException("tenant.blocked");
            } else if (ObjectUtil.isNotNull(tenant.getExpireTime()) && new Date().after(tenant.getExpireTime())) {
                log.info("登录租户：{} 已超过有效期.", tenantId);
                throw new TenantException("tenant.expired");
            }
        }

        //2.2 租户下的用户登录
        if (StrUtil.isNotEmpty(userTenantId)) {
            if (StrUtil.isEmpty(tenantId)) {
                log.info("普通用户不能登录《系统管理平台》");
                throw new BizException("普通用户不能登录系统管理平台");
            }
            if (!StrUtil.equalsIgnoreCase(userTenantId, tenantId)) {
                log.info("该租户下，租户下未找到该账号");
                throw new BizException("该租户下，租户下未找到该账号");
            }
        }

    }

//
//    private final SysUserMapper userMapper;
//    private final CaptchaProperties captchaProperties;
//    private final SysPermissionService permissionService;
//    private final SysTenantService tenantService;
//
//    @Value("${user.password.maxRetryCount}")
//    private Integer maxRetryCount;
//
//    @Value("${user.password.lockTime}")
//    private Integer lockTime;
//
//
//    private String safeWrapper(String tenantId, String login, Supplier<String> handle) {
//        try {
//            return handle.get();
//        } catch (UserException e) {
//            saveLoginRecord(tenantId, login, Constants.LOGIN_FAIL, e.getMessage());
//            throw e;
//        }
//    }
//
//    /**
//     * 登录验证
//     *
//     * @param userName 用户名
//     * @param password 密码
//     * @param code     验证码
//     * @param uuid     唯一标识
//     * @return 结果
//     */
//    public String login(String tenantId, String userName, String password, String code, String uuid) {
//        return this.safeWrapper(tenantId, userName, () -> {
//            boolean captchaEnabled = captchaProperties.getEnable();
//            // 1. 验证码开关
//            if (captchaEnabled) {
//                validateCaptcha(tenantId, userName, code, uuid);
//            }
//
//            // 2. 框架登录不限制从什么表查询 只要最终构建出 LoginUser 即可
//            final SysUserVo user = TenantHelper.ignore(() -> userMapper.selectUserByUserName(userName));
//            checkUser(user, userName);
//            // 3. 校验租户
//            checkTenant(tenantId, user);
//            // 4.校验密码
//            checkLogin(LoginType.PASSWORD, userName, () -> !BCrypt.checkpw(password, user.getPassword()));
//            return postLogin(user, tenantId, DeviceType.PC);
//        });
//    }
//
//    public String smsLogin(String tenantId, String mobile, String smsCode) {
//        return this.safeWrapper(tenantId, mobile, () -> {
//            //2. 通过手机号查找用户
//            SysUserVo user = TenantHelper.ignore(() -> userMapper.selectUserByMobile(mobile));
//            checkUser(user, mobile);
//            //3. 校验租户
//            checkTenant(tenantId, user);
//            //4. 校验短信
//            checkLogin(LoginType.SMS, user.getUserName(), () -> !validateSmsCode(tenantId, mobile, smsCode));
//            return postLogin(user, tenantId, DeviceType.APP);
//        });
//    }
//
//    public String emailLogin(String tenantId, String email, String emailCode) {
//        return this.safeWrapper(tenantId, email, () -> {
//            //1. xx
//            //2. 通过邮箱查找用户
//            SysUserVo user = TenantHelper.ignore(() -> userMapper.selectUserByEmail(email));
//            checkUser(user, email);
//            //3. 校验租户
//            checkTenant(tenantId, user);
//            //4. 校验邮箱code
//            checkLogin(LoginType.EMAIL, user.getUserName(), () -> !validateEmailCode(tenantId, email, emailCode));
//            return postLogin(user, tenantId, DeviceType.APP);
//        });
//
//    }
//
//
//
//
//
//    private String postLogin(LoginUser loginUser, SysUserVo user, String tenantId, DeviceType device) {
//        LoginHelper.loginByDevice(loginUser, device);
//
//        // login 成功后设置租户缓存
//        if (StrUtil.isNotEmpty(tenantId)) {
//            TenantHelper.setDynamic(tenantId);
//        }
//        saveLoginRecord(loginUser.getTenantId(), user.getUserName(), Constants.LOGIN_SUCCESS, MessageUtils.message("user.login.success"));
//        updateLoginInfoToUser(user.getId());
//        return StpUtil.getTokenValue();
//    }
//
//    private String postLogin(SysUserVo user, String tenantId, DeviceType device) {
//        //5 . 此处可根据登录用户的数据不同 自行创建 loginUser 属性不够用继承扩展就行了
//        LoginUser loginUser = buildLoginUser(user);
//
//        return postLogin(loginUser, user, tenantId, device);
//    }
//
//    /**
//     * 退出登录
//     */
//    public void logout() {
//        try {
//            LoginUser loginUser = LoginHelper.getLoginUser();
//            if (TenantHelper.isEnable() && LoginHelper.isSuperAdmin()) {
//                // 超级管理员 登出清除动态租户
//                TenantHelper.clearDynamic();
//            }
//            StpUtil.logout();
//            saveLoginRecord(loginUser.getTenantId(), loginUser.getUserName(), Constants.LOGOUT,
//                MessageUtils.message("user.logout.success"));
//        } catch (NotLoginException ignored) {
//        }
//    }
//
//    /**
//     * 校验短信验证码
//     */
//    private boolean validateSmsCode(String tenantId, String mobile, String smsCode) {
//        String code = RedisUtils.getCacheObject(GlobalConstants.CAPTCHA_CODE_KEY + mobile);
//        if (StringUtils.isBlank(code)) {
//            saveLoginRecord(tenantId, mobile, Constants.LOGIN_FAIL, MessageUtils.message("user.jcaptcha.expire"));
//            throw new CaptchaExpireException();
//        }
//        return code.equals(smsCode);
//    }
//
//    /**
//     * 校验邮箱验证码
//     */
//    private boolean validateEmailCode(String tenantId, String email, String emailCode) {
//        String code = RedisUtils.getCacheObject(GlobalConstants.CAPTCHA_CODE_KEY + email);
//        if (StringUtils.isBlank(code)) {
//            saveLoginRecord(tenantId, email, Constants.LOGIN_FAIL, MessageUtils.message("user.jcaptcha.expire"));
//            throw new CaptchaExpireException();
//        }
//        return code.equals(emailCode);
//    }
//
//    /**
//     * 校验验证码
//     *
//     * @param username 用户名
//     * @param code     验证码
//     * @param uuid     唯一标识
//     */
//    public void validateCaptcha(String tenantId, String username, String code, String uuid) {
//        String verifyKey = GlobalConstants.CAPTCHA_CODE_KEY + StringUtils.defaultString(uuid, "");
//        String captcha = RedisUtils.getCacheObject(verifyKey);
//        RedisUtils.deleteObject(verifyKey);
//        if (captcha == null) {
//            saveLoginRecord(tenantId, username, Constants.LOGIN_FAIL, MessageUtils.message("user.jcaptcha.expire"));
//            throw new CaptchaExpireException();
//        }
//        if (!code.equalsIgnoreCase(captcha)) {
//            saveLoginRecord(tenantId, username, Constants.LOGIN_FAIL, MessageUtils.message("user.jcaptcha.error"));
//            throw new CaptchaException();
//        }
//    }
//
//    private void checkUser(SysUserVo user, String login) {
//        if (ObjectUtil.isNull(user)) {
//            log.info("登录用户：{} 不存在.", login);
//            throw new UserException("user.not.exists", login);
//        }
//
//        if (UserStatus.DISABLE.getCode().equals(user.getStatus())) {
//            log.info("登录用户：{} 已被停用.", login);
//            throw new UserException("user.blocked", login);
//        }
//    }
//
//
//    /**
//     * 构建登录用户
//     */
//    private LoginUser buildLoginUser(SysUserVo user) {
//        LoginUser loginUser = new LoginUser();
//        loginUser.setTenantId(user.getTenantId());
//        loginUser.setUserId(user.getUserId());
//        loginUser.setDeptId(user.getDeptId());
//        loginUser.setUserName(user.getUserName());
//        loginUser.setUserType(user.getUserType());
//        loginUser.setMenuPermission(permissionService.getMenuPermission(user.getId()));
//        loginUser.setRolePermission(permissionService.getRolePermission(user.getId()));
//        loginUser.setDeptName(ObjectUtil.isNull(user.getDept()) ? "" : user.getDept().getDeptName());
//        List<RoleDTO> roles = BeanUtil.copyToList(user.getRoles(), RoleDTO.class);
//        loginUser.setRoles(roles);
//        return loginUser;
//    }
//
//    /**
//     * 记录登录信息
//     *
//     * @param userId 用户ID
//     */
//    public void updateLoginInfoToUser(Long userId) {
//        SysUser sysUser = new SysUser();
//        sysUser.setId(userId);
//        sysUser.setLoginIp(ServletUtils.getClientIP());
//        sysUser.setLoginDate(DateUtils.getNowDate());
//        sysUser.setUpdateBy(userId);
//        userMapper.updateById(sysUser);
//    }
//
//    /**
//     * 登录校验
//     */
//    private void checkLogin(LoginType loginType, String username, Supplier<Boolean> supplier) {
//        String errorKey = GlobalConstants.PWD_ERR_CNT_KEY + username;
//
//        // 获取用户登录错误次数，默认为0 (可自定义限制策略 例如: key + username + ip)
//        int errorNumber = ObjectUtil.defaultIfNull(RedisUtils.getCacheObject(errorKey), 0);
//        // 锁定时间内登录 则踢出
//        if (errorNumber >= maxRetryCount) {
//            throw new UserException(loginType.getRetryLimitExceed(), maxRetryCount, lockTime);
//        }
//
//        if (supplier.get()) {
//            // 错误次数递增
//            errorNumber++;
//            RedisUtils.setCacheObject(errorKey, errorNumber, Duration.ofMinutes(lockTime));
//            // 达到规定错误次数 则锁定登录
//            if (errorNumber >= maxRetryCount) {
//                throw new UserException(loginType.getRetryLimitExceed(), maxRetryCount, lockTime);
//            } else {
//                // 未达到规定错误次数
//                throw new UserException(loginType.getRetryLimitCount(), errorNumber, maxRetryCount - errorNumber);
//            }
//        }
//
//        // 登录成功 清空错误次数
//        RedisUtils.deleteObject(errorKey);
//    }
//
//    private void checkTenant(String tenantId, SysUserVo user) {
//
//        boolean superAdmin = LoginHelper.isSuperAdmin(user.getId());
//        //1.  未开启跳过,superAdmin也跳过，系统用户登录default租户跳过
//        if (!TenantHelper.isEnable()
//            || superAdmin
//            || TenantConstants.DEFAULT_TENANT_ID.equals(tenantId) && StrUtil.isEmpty(user.getTenantId())
//        ) {
//            return;
//        }
//        //2 非superAdmin
//
//        //2.1 要登录某个特定租户，校验租户状态
//        if (StrUtil.isNotEmpty(tenantId)) {
//            SysTenantVo tenant = tenantService.getByTenantId(tenantId);
//            if (ObjectUtil.isNull(tenant)) {
//                log.info("登录租户：{} 不存在.", tenantId);
//                throw new TenantException("tenant.not.exists");
//            } else if (TenantStatus.DISABLE.getCode().equals(tenant.getStatus())) {
//                log.info("登录租户：{} 已被停用.", tenantId);
//                throw new TenantException("tenant.blocked");
//            } else if (ObjectUtil.isNotNull(tenant.getExpireTime())
//                && new Date().after(tenant.getExpireTime())) {
//                log.info("登录租户：{} 已超过有效期.", tenantId);
//                throw new TenantException("tenant.expired");
//            }
//        }
//
//        //2.2 租户下的用户登录
//        if (StrUtil.isNotEmpty(user.getTenantId())) {
//            if (StrUtil.isEmpty(tenantId)) {
//                log.info("普通用户不能登录《系统管理平台》");
//                throw new BizException("普通用户不能登录系统管理平台");
//            }
//            if (!StrUtil.equalsIgnoreCase(user.getTenantId(), tenantId)) {
//                log.info("该租户下，租户下未找到该账号");
//                throw new BizException("该租户下，租户下未找到该账号");
//            }
//        }
//
//    }

}
