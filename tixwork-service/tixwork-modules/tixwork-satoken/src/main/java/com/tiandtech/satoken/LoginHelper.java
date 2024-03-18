package com.tiandtech.satoken;

import cn.dev33.satoken.context.SaHolder;
import cn.dev33.satoken.context.model.SaStorage;
import cn.dev33.satoken.session.SaSession;
import cn.dev33.satoken.stp.SaLoginModel;
import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.ObjectUtil;
import com.tiandtech.core.constant.TenantConstants;
import com.tiandtech.core.constant.UserConstants;
import com.tiandtech.core.domain.model.LoginUser;
import com.tiandtech.core.enums.UserType;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.Set;

/**
 * 登录鉴权助手
 * <p>
 * user_type 为 用户类型 同一个用户表 可以有多种用户类型 例如 pc,app deivce 为 设备类型 同一个用户类型 可以有 多种设备类型 例如 web,ios 可以组成 用户类型与设备类型多对多的 权限灵活控制
 * <p>
 * 多用户体系 针对 多种用户类型 但权限控制不一致 可以组成 多用户类型表与多设备类型 分别控制权限
 */
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class LoginHelper {

    public static final String LOGIN_USER_KEY = "loginUser";
    public static final String TENANT_KEY = "tenantId";
    public static final String USER_KEY = "userId";
    public static final String CLIENT_KEY = "clientid";

    /**
     * 登录系统 基于 设备类型 针对相同用户体系不同设备
     *
     * @param loginUser 登录用户信息
     * @param model     配置参数
     */
    public static void login(LoginUser loginUser, SaLoginModel model) {
        SaStorage storage = SaHolder.getStorage();
        storage.set(LOGIN_USER_KEY, loginUser);
        storage.set(TENANT_KEY, loginUser.getTenantId());
        storage.set(USER_KEY, loginUser.getUserId());
        model = ObjectUtil.defaultIfNull(model, new SaLoginModel());
        // 扩展JWT中的字段
        StpUtil.login(loginUser.getLoginId(),
            model.setExtra(TENANT_KEY, loginUser.getTenantId())
                .setExtra(USER_KEY, loginUser.getUserId())
        );
        StpUtil.getSession().set(LOGIN_USER_KEY, loginUser);
    }

    /**
     * 获取用户(多级缓存)
     */
    public static LoginUser getLoginUser() {
        LoginUser loginUser = (LoginUser) SaHolder.getStorage().get(LOGIN_USER_KEY);
        if (loginUser != null) {
            return loginUser;
        }
        // 针对有DataPermission设置的用户，会抛出NotLoginException，
        // 检查逻辑是否正确，如果确定需要忽略权限，可以DataPermission.ignore
        SaSession session = StpUtil.getSession();
        if (ObjectUtil.isNull(session)) {
            return null;
        }
        loginUser = (LoginUser) session.get(LOGIN_USER_KEY);
        SaHolder.getStorage().set(LOGIN_USER_KEY, loginUser);
        return loginUser;
    }

    /**
     * 获取用户基于token
     */
    public static LoginUser getLoginUser(String token) {
        Object loginId = StpUtil.getLoginIdByToken(token);
        SaSession session = StpUtil.getSessionByLoginId(loginId);
        if (ObjectUtil.isNull(session)) {
            return null;
        }
        return (LoginUser) session.get(LOGIN_USER_KEY);
    }

    /**
     * 获取用户id
     */
    public static Long getUserId() {
        Long userId;
        try {
            userId = Convert.toLong(SaHolder.getStorage().get(USER_KEY));
            if (ObjectUtil.isNull(userId)) {
                userId = Convert.toLong(StpUtil.getExtra(USER_KEY));
                SaHolder.getStorage().set(USER_KEY, userId);
            }
        } catch (Exception e) {
            return null;
        }
        return userId;
    }

    /**
     * 获取租户ID
     */
    public static String getTenantId() {
        String tenantId;
        try {
            tenantId = (String) SaHolder.getStorage().get(TENANT_KEY);
            if (ObjectUtil.isNull(tenantId)) {
                tenantId = (String) StpUtil.getExtra(TENANT_KEY);
                SaHolder.getStorage().set(TENANT_KEY, tenantId);
            }
        } catch (Exception e) {
            return null;
        }
        return tenantId;
    }

    /**
     * 获取部门ID
     */
    public static Long getDeptId() {
        return getLoginUser().getDeptId();
    }

    /**
     * 获取用户账户
     */
    public static String getUserName() {
        return getLoginUser().getUserName();
    }

    /**
     * 获取用户类型
     */
    public static UserType getUserType() {
        String loginType = StpUtil.getLoginIdAsString();
        return UserType.getUserType(loginType);
    }

    /**
     * 是否为超级管理员
     *
     * @param userId 用户ID
     * @return 结果
     */
    public static boolean isSuperAdmin(Long userId) {
        return UserConstants.SUPER_ADMIN_ID.equals(userId);
    }

    public static boolean isSuperAdmin() {
        return isSuperAdmin(getUserId());
    }

    /**
     * 是否为超级管理员
     *
     * @param rolePermission 角色权限标识组
     * @return 结果
     */
    public static boolean isTenantAdmin(Set<String> rolePermission) {
        if (rolePermission == null) {
            return false;
        }
        return rolePermission.contains(TenantConstants.TENANT_ADMIN_ROLE_KEY);
    }

    public static boolean isTenantAdmin() {
        return isTenantAdmin(getLoginUser().getRolePermission());
    }

    public static boolean isNotLogin() {
        return getUserId() == null;
    }

}
