package com.tiandtech.system.controller.system;

import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import cn.dev33.satoken.secure.BCrypt;
import com.tiandtech.core.constant.TenantConstants;
import com.tiandtech.core.domain.WebResult;
import com.tiandtech.encrypt.utils.PasswordUtils;
import com.tiandtech.log.Log;
import com.tiandtech.log.enums.BusinessType;
import com.tiandtech.system.service.SysUserService;
import com.tiandtech.web.core.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 用户信息
 */
@RestController
@RequestMapping("/system/admin")
public class AdminServiceController extends BaseController {

    @Autowired
    private SysUserService userService;

    /**
     * 重置密码
     */
    @SaCheckRole(value = {
        TenantConstants.SUPER_ADMIN_ROLE_KEY,
        TenantConstants.TENANT_ADMIN_ROLE_KEY
    }, mode = SaMode.OR)
    @Log(title = "重置用户的密码", businessType = BusinessType.UPDATE)
    @GetMapping(value = {"/resetUserPassword/{userId}"})
    public WebResult resetUserPassword(@PathVariable(value = "userId", required = true) Long userId) {
        userService.checkUserAllowed(userId);
        userService.checkUserDataScope(userId);

        String password = PasswordUtils.randomPassword();
        userService.updatePassword(userId, BCrypt.hashpw(password));
        //回显用
        return WebResult.success(password);
    }

}
