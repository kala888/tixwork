package com.tiandtech.websocket;

import cn.hutool.core.lang.Console;
import cn.hutool.core.util.StrUtil;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.server.HandshakeInterceptor;

/**
 * WebSocket 配置
 */
@AutoConfiguration
@ConditionalOnProperty(value = "websocket.enabled", havingValue = "true")
@EnableConfigurationProperties(WebSocketProperties.class)
@EnableWebSocket
public class WebSocketConfig {

    @Bean
    public WebSocketConfigurer webSocketConfigurer(HandshakeInterceptor handshakeInterceptor,
                                                   WebSocketHandler webSocketHandler,
                                                   WebSocketProperties webSocketProperties) {

        if (StrUtil.isBlank(webSocketProperties.getPath())) {
            webSocketProperties.setPath("/websocket");
        }
        Console.log("websocket on", webSocketProperties.getPath());
        if (StrUtil.isBlank(webSocketProperties.getAllowedOrigins())) {
            webSocketProperties.setAllowedOrigins("*");
        }

        return registry -> registry
            .addHandler(webSocketHandler, webSocketProperties.getPath())
            .addInterceptors(handshakeInterceptor)
            .setAllowedOrigins(webSocketProperties.getAllowedOrigins());
    }

    @Bean
    public HandshakeInterceptor handshakeInterceptor() {
        return new PlusWebSocketInterceptor();
    }

    @Bean
    public WebSocketHandler webSocketHandler() {
        return new PlusWebSocketHandler();
    }

    @Bean
    public WebSocketTopicListener topicListener() {
        return new WebSocketTopicListener();
    }
}
