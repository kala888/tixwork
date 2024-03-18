package com.tiandtech.system.domain.vo;

import com.tiandtech.base.utils.Getter;
import lombok.Data;

import java.util.Set;

/**
 * 用户个人信息
 */
@Data
public class ProfileVo {

    /**
     * 用户信息
     */
    private SysUserVo user;


    /**
     * 菜单权限
     */
    private Set<String> permissions;

    /**
     * 角色权限
     */
    private Set<String> roles;

    /**
     * 用户所属角色组
     */
    private String roleGroup;

    /**
     * 用户所属岗位组
     */
    private String postGroup;

    public boolean isSuperAdmin() {
        return Getter.get(
            () -> user.getRoles().stream().anyMatch(SysRoleVo::isSuperAdmin)
        ).orElse(false);
    }

}
