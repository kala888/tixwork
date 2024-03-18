package com.tiandtech.system.controller.system;

import cn.dev33.satoken.annotation.SaIgnore;
import cn.dev33.satoken.secure.BCrypt;
import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.ListUtil;
import cn.hutool.core.util.StrUtil;
import com.tiandtech.core.domain.WebResult;
import com.tiandtech.core.domain.model.LoginUser;
import com.tiandtech.core.utils.StringUtils;
import com.tiandtech.encrypt.utils.PasswordUtils;
import com.tiandtech.log.Log;
import com.tiandtech.log.enums.BusinessType;
import com.tiandtech.satoken.LoginHelper;
import com.tiandtech.system.domain.SysNotice;
import com.tiandtech.system.domain.bo.SysUserBo;
import com.tiandtech.system.domain.bo.SysUserProfileBo;
import com.tiandtech.system.domain.vo.ProfileVo;
import com.tiandtech.system.domain.vo.RouterVo;
import com.tiandtech.system.domain.vo.SysUserVo;
import com.tiandtech.system.service.SysMenuService;
import com.tiandtech.system.service.SysNoticeService;
import com.tiandtech.system.service.SysUserService;
import com.tiandtech.tenant.helper.TenantHelper;
import com.tiandtech.web.core.BaseController;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 个人信息 业务处理
 */
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/profile")
public class SysProfileController extends BaseController {

    private final SysUserService userService;
    private final SysMenuService menuService;
    private final SysNoticeService noticeService;

    /**
     * 个人信息
     */
    @GetMapping
    @SaIgnore
    public WebResult<ProfileVo> profile() {
        //退出的时候，前台框架会调用profile，方式报错
        if (LoginHelper.isNotLogin()) {
            return WebResult.success(new ProfileVo());
        }
        ProfileVo profileVo = new ProfileVo();
        LoginUser loginUser = LoginHelper.getLoginUser();
        if (loginUser == null) {
            return WebResult.success(profileVo);
        }
        SysUserVo user = null;
        if (TenantHelper.isEnable() && LoginHelper.isSuperAdmin()) {
            user = TenantHelper.ignore(() -> userService.selectUserById(loginUser.getUserId()));
        } else {
            user = userService.getProfile(loginUser.getUserId());
        }
        if (user == null) {
            return WebResult.success(profileVo);
        }
        profileVo.setUser(user);
        profileVo.setRoleGroup(userService.selectUserRoleGroup(user.getUserName()));
        profileVo.setPostGroup(userService.selectUserPostGroup(user.getUserName()));
        profileVo.setPermissions(loginUser.getMenuPermission());
        profileVo.setRoles(loginUser.getRolePermission());

        return WebResult.success(profileVo);
    }

    /**
     * 修改用户
     */
    @Log(title = "个人信息", businessType = BusinessType.UPDATE)
    @PostMapping
    public WebResult<Void> updateProfile(@RequestBody SysUserProfileBo profile) {
        SysUserBo user = BeanUtil.toBean(profile, SysUserBo.class);
        if (StringUtils.isNotEmpty(user.getMobile()) && !userService.checkMobileUnique(user)) {
            return WebResult.error("修改用户'" + user.getUserName() + "'失败，手机号码已存在");
        }
        if (StringUtils.isNotEmpty(user.getEmail()) && !userService.checkEmailUnique(user)) {
            return WebResult.error("修改用户'" + user.getUserName() + "'失败，邮箱账号已存在");
        }
        user.setId(LoginHelper.getUserId());
        if (userService.updateUserProfile(user) > 0) {
            return WebResult.success();
        }
        return WebResult.error("修改个人信息异常，请联系管理员");
    }

    /**
     * 重置密码
     *
     * @param newPassword 旧密码
     * @param oldPassword 新密码
     */
    @Log(title = "个人信息", businessType = BusinessType.UPDATE)
    @PostMapping("/updatePassword")
    public WebResult<Void> updatePwd(String oldPassword, String newPassword) {
        SysUserVo user = userService.selectUserById(LoginHelper.getUserId());
        String password = user.getPassword();
        if (!BCrypt.checkpw(oldPassword, password)) {
            return WebResult.error("修改密码失败，旧密码错误");
        }
        if (BCrypt.checkpw(newPassword, password)) {
            return WebResult.error("新密码不能与旧密码相同");
        }
        if (PasswordUtils.isEasyPassword(user.getPassword())) {
            return WebResult.error("新增用户'" + user.getUserName() + "'失败，密码过于简单, 请务必包含大写字符，小写字符，数字，特殊字符");
        }

        if (userService.updatePassword(user.getId(), BCrypt.hashpw(newPassword)) > 0) {
            return WebResult.success();
        }
        return WebResult.error("修改密码异常，请联系管理员");
    }

    /**
     * 头像上传
     */
    @Log(title = "用户头像", businessType = BusinessType.UPDATE)
    @PostMapping("/updateAvatar")
    public WebResult updateAvatar(SysUserProfileBo profile) {
        String avatar = profile.getAvatar();
        if (StrUtil.isNotEmpty(avatar)) {
            LoginUser loginUser = LoginHelper.getLoginUser();
            if (userService.updateUserAvatar(loginUser.getUserId(), avatar)) {
                return WebResult.success();
            }
        }
        return WebResult.error("上传图片异常，请联系管理员");
    }

    /**
     * 获取路由信息
     *
     * @return 路由信息
     */
    @GetMapping("/getRouters")
    @SaIgnore
    public WebResult.TableDataInfo<RouterVo> getRouters() {
        //退出的时候，前台框架会调用profile，方式报错
        if (LoginHelper.isNotLogin()) {
            return WebResult.success(ListUtil.empty());
        }
        List<RouterVo> routes = menuService.getRoutesByUserId(LoginHelper.getUserId());
        return WebResult.success(routes);
    }

    @GetMapping("/getNotices")
    public WebResult<List<SysNotice>> getNotices() {
        List<SysNotice> list = noticeService.selectLatest();
        return WebResult.success(list);
    }
}
