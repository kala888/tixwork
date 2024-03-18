package com.tiandtech.system.service.impl;

import com.tiandtech.satoken.LoginHelper;
import com.tiandtech.sensitive.SensitiveService;
import com.tiandtech.tenant.helper.TenantHelper;
import org.springframework.stereotype.Service;

/**
 * 脱敏服务 默认管理员不过滤 需自行根据业务重写实现
 */
@Service
public class SysSensitiveServiceImpl implements SensitiveService {

    /**
     * 是否脱敏
     */
    @Override
    public boolean isSensitive() {
        if (TenantHelper.isEnable()) {
            return !LoginHelper.isSuperAdmin() && !LoginHelper.isTenantAdmin();
        }
        return !LoginHelper.isSuperAdmin();
    }

}
