package com.tiandtech.cust;

import cn.dev33.satoken.annotation.SaIgnore;
import cn.hutool.json.JSONUtil;
import com.tiandtech.core.utils.ToAdmin;
import com.tiandtech.websocket.WebSocketUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.function.Supplier;

@SaIgnore
@RequiredArgsConstructor
@RestController
@RequestMapping("/test")
@Slf4j
public class TestController {

    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }

    private void safeTest(String tips, Supplier<String> handle) {
        try {
            String result = handle.get();
            log.info(tips + " 成功: " + result);
        } catch (Exception e) {
            log.error(tips + " 失败:");
        }
    }

    @GetMapping("/mail-to-admin")
    public String mailToAdmin() {
        ToAdmin.say("你好,邮件测试", "nothing");
        return "hello";
    }

    @PostMapping("/websocket")
    public String webSocketMessage(@RequestBody Map data) {
        String message = JSONUtil.toJsonStr(data);
        log.debug("send data" + message);
        WebSocketUtils.sendMessage(1L, message);
        return "ok";
    }

}
