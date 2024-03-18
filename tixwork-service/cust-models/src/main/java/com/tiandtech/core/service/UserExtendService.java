package com.tiandtech.core.service;

import cn.hutool.core.lang.Console;
import com.tiandtech.system.domain.SysUser;
import com.tiandtech.system.service.SysUserExtendService;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

@Service
@Primary
public class UserExtendService implements SysUserExtendService {

    @Override
    public void postUserCreate(SysUser user) {
        Console.log("post....", user.getUserName());
    }
}
