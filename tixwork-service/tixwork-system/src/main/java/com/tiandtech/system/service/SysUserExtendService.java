package com.tiandtech.system.service;

import com.tiandtech.system.domain.SysUser;

public interface SysUserExtendService {

    void postUserCreate(SysUser user);
    void postUserRegistry(SysUser user);
}
