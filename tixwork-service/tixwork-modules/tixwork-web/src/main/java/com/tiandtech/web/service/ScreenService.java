package com.tiandtech.web.service;

import com.tiandtech.base.domain.dto.Screen;

/**
 * 标记接口，由于ScreenController存在一定安全问题，所有调用的service必须继承这个接口。
 * <b>且不应该有任何不安全的方法</b>
 */
public interface ScreenService {

    Screen info();
}
