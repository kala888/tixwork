package com.tiandtech.core.service;

import cn.hutool.core.lang.Console;
import com.tiandtech.system.domain.SysTenant;
import com.tiandtech.system.service.SysTenantExtendService;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

@Service
@Primary
public class TenantExtendService implements SysTenantExtendService {

    @Override
    public void postTenantCreate(SysTenant tenant) {
        Console.log("post....", tenant.getCompanyName());
    }
}
