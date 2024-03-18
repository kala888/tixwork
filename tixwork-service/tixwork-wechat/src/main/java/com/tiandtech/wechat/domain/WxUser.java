package com.tiandtech.wechat.domain;

import cn.binarywang.wx.miniapp.bean.WxMaUserInfo;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class WxUser extends WxMaUserInfo {

    private String openid;
    private String unionid;
    private String mobile;
}
