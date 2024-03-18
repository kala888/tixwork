package com.tiandtech.wechat.service;

import cn.binarywang.wx.miniapp.api.WxMaService;
import cn.binarywang.wx.miniapp.bean.WxMaJscode2SessionResult;
import cn.binarywang.wx.miniapp.bean.WxMaPhoneNumberInfo;
import cn.binarywang.wx.miniapp.bean.WxMaUserInfo;
import cn.hutool.core.bean.BeanUtil;
import com.tiandtech.core.exception.ServiceException;
import com.tiandtech.wechat.domain.WxUser;
import me.chanjar.weixin.common.error.WxErrorException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WxLoginService {

    @Autowired
    private WxMaService wxService;

    private WxMaJscode2SessionResult getSessionInfo(String code) {
        WxMaJscode2SessionResult session = null;
        try {
            session = wxService.getUserService().getSessionInfo(code);
        } catch (WxErrorException e) {
            throw new ServiceException("login handler error");
        }
        if (null == session) {
            throw new ServiceException("login handler error");
        }
        return session;
    }

    public WxUser login(String code, String encryptedData, String iv) {
        // 获取微信用户session
        WxMaJscode2SessionResult session = this.getSessionInfo(code);
        // 解密用户信息
        WxMaUserInfo wxUserInfo = wxService.getUserService().getUserInfo(
            session.getSessionKey(), encryptedData, iv);
        if (null == wxUserInfo) {
            throw new ServiceException("wxUser not exist");
        }
        WxUser user = BeanUtil.toBean(wxUserInfo, WxUser.class);
        user.setOpenid(session.getOpenid());
        user.setUnionid(session.getUnionid());
        return user;
    }

    public WxUser loginWithMobile(String code, String encryptedData, String iv) {
        WxUser user = new WxUser();
        // 获取微信用户session
        WxMaJscode2SessionResult session = this.getSessionInfo(code);
        user.setOpenid(session.getOpenid());
        user.setUnionid(session.getUnionid());

        // 解密手机号码信息
        WxMaPhoneNumberInfo wxMaPhoneNumberInfo = wxService.getUserService().getPhoneNoInfo(session.getSessionKey(),
            encryptedData, iv);
        String mobile = wxMaPhoneNumberInfo.getPhoneNumber();
        user.setNickName("微信用户");
        user.setMobile(mobile);
        return user;

    }

}
