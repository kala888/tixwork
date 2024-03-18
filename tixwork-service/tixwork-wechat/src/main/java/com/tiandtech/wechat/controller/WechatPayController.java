package com.tiandtech.wechat.controller;

import com.github.binarywang.wxpay.bean.notify.WxPayNotifyResponse;
import com.github.binarywang.wxpay.bean.order.WxPayMpOrderResult;
import com.github.binarywang.wxpay.exception.WxPayException;
import com.tiandtech.core.domain.WebResult;
import com.tiandtech.wechat.service.WechatPayService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/app/pay")
@Slf4j
@RequiredArgsConstructor
public class WechatPayController {
    private final WechatPayService service;

    @GetMapping("/pay-info/{id}")
    public WebResult<WxPayMpOrderResult> getPayInfo(@NotNull @PathVariable Long id) {
        WxPayMpOrderResult result = service.payOrder(id);
        return WebResult.success(result);
    }

    @GetMapping("/callback/{id}")
    public WebResult paymentCallback(@NotNull @PathVariable Long id) {
        try {
            boolean result = service.paymentCallback(id);
            return WebResult.success(result);
        } catch (WxPayException e) {
            return WebResult.success(false);
        }
    }

    @ResponseBody
    @RequestMapping("/notify")
    public String notifyByWechatServer(HttpServletRequest request, HttpServletResponse response) {
        try {
            String xmlResult = IOUtils.toString(request.getInputStream(), request.getCharacterEncoding());
            service.notifyByWechatServer(xmlResult);
            return WxPayNotifyResponse.success("处理成功!");
        } catch (Exception e) {
            log.error("微信回调结果异常,异常原因{}", e.getMessage());
            return WxPayNotifyResponse.fail(e.getMessage());
        }
    }
}
