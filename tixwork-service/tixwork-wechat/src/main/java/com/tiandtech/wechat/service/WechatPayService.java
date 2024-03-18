package com.tiandtech.wechat.service;

import com.github.binarywang.wxpay.bean.order.WxPayMpOrderResult;
import com.github.binarywang.wxpay.exception.WxPayException;
import com.tiandtech.mybatis.annotation.DataPermissionIgnore;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Slf4j
public class WechatPayService {
    /**
     * 发起支付，支付中和未支付的订单可以支付
     */
    public WxPayMpOrderResult payOrder(Long id) {
        return null;
    }


    @DataPermissionIgnore
    public void notifyByWechatServer(String xmlResult) throws WxPayException {

    }

    public boolean paymentCallback(Long id) throws WxPayException {
        return true;
    }
}
