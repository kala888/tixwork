package com.tiandtech.wechat.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaIgnore;
import com.tiandtech.core.domain.WebResult;
import com.tiandtech.satoken.LoginHelper;
import com.tiandtech.system.domain.bo.SysUserBo;
import com.tiandtech.wechat.service.AppService;
import com.tiandtech.wechat.vo.HomePage;
import com.tiandtech.wechat.vo.ProfileVo;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/app")
public class AppController {

    private final AppService service;

    @SaIgnore
    @GetMapping("/home")
    public WebResult<HomePage> home() {
        HomePage home = service.getHomePage();
        return WebResult.success(home);
    }

    @SaIgnore
    @GetMapping("/me")
    public WebResult<ProfileVo> me() {
        if (LoginHelper.isNotLogin()) {
            return WebResult.success(new ProfileVo());
        }
        return WebResult.success(service.getProfile());
    }

    @SaCheckLogin
    @PostMapping("/profile/update")
    public WebResult<Boolean> profile(@RequestBody @NotNull SysUserBo bo) {
        if (LoginHelper.isNotLogin()) {
            return WebResult.success(false);
        }
        Boolean result = service.updateProfile(bo);
        return WebResult.success(result);
    }

    @SaCheckLogin
    @PostMapping("/bind-mobile")
    public WebResult<Boolean> bindMobile(@RequestBody @NotNull SysUserBo bo) {
        if (LoginHelper.isNotLogin()) {
            return WebResult.success(false);
        }
        Boolean result = service.updateProfile(bo);
        return WebResult.success(result);
    }

}
