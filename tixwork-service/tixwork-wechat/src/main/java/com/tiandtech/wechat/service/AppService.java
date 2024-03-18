package com.tiandtech.wechat.service;

import cn.hutool.core.lang.UUID;
import com.tiandtech.mybatis.helper.DataPermissionHelper;
import com.tiandtech.satoken.LoginHelper;
import com.tiandtech.system.domain.bo.SysUserBo;
import com.tiandtech.system.domain.vo.SysUserVo;
import com.tiandtech.system.service.SysUserService;
import com.tiandtech.wechat.element.ActionLike;
import com.tiandtech.wechat.vo.HomePage;
import com.tiandtech.wechat.vo.ProfileVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 *
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class AppService {
    private final SysUserService userService;

    //    @Cacheable(cacheNames = "miniapp:home")
    public HomePage getHomePage() {
        HomePage homePage = new HomePage();
        homePage.setTransactionId(UUID.fastUUID().toString());
        return new HomePage();
    }


    public ProfileVo getProfile() {
        ProfileVo profile = new ProfileVo();
        Long userId = LoginHelper.getUserId();
        SysUserVo user = userService.getProfile(userId);
        profile.setUserId(user.getUserId());
        profile.setNickName(user.getNickName());
        profile.setAvatar(user.getAvatar());
        profile.setBrief(user.getMobile());
        List<ActionLike> lineActions = new ArrayList<>();
        profile.setLineActions(lineActions);
        return profile;
    }

    public Boolean updateProfile(SysUserBo bo) {
        Long userId = LoginHelper.getUserId();
        SysUserBo user = new SysUserBo();
        user.setId(userId);
        user.setNickName(bo.getNickName());
        user.setAvatar(bo.getAvatar());
        Boolean result = DataPermissionHelper.ignore(() -> userService.updateUserProfile(user) > 0);
        return result;
    }
}
