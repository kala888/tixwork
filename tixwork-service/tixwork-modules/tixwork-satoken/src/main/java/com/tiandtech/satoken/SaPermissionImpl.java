package com.tiandtech.satoken;

import cn.dev33.satoken.stp.StpInterface;
import com.tiandtech.core.domain.model.LoginUser;
import com.tiandtech.core.enums.UserType;

import java.util.ArrayList;
import java.util.List;

/**
 * sa-token 权限管理实现类
 */
public class SaPermissionImpl implements StpInterface {

    /**
     * 获取菜单权限列表
     */
    @Override
    public List<String> getPermissionList(Object loginId, String loginType) {
        LoginUser loginUser = LoginHelper.getLoginUser();
        UserType userType = loginUser.getUserType();
        if (userType == UserType.SYS_USER) {
            return new ArrayList<>(loginUser.getMenuPermission());
        } else if (userType == UserType.APP_USER) {
            // 其他端 自行根据业务编写
        }
        return new ArrayList<>();
    }

    /**
     * 获取角色权限列表
     */
    @Override
    public List<String> getRoleList(Object loginId, String loginType) {
        LoginUser loginUser = LoginHelper.getLoginUser();
        UserType userType = loginUser.getUserType();
        if (userType == UserType.SYS_USER) {
            return new ArrayList<>(loginUser.getRolePermission());
        } else if (userType == UserType.APP_USER) {
            // 其他端 自行根据业务编写
        }
        return new ArrayList<>();
    }
}
