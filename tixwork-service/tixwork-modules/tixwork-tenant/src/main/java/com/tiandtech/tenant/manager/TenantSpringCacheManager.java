package com.tiandtech.tenant.manager;

import com.tiandtech.core.constant.GlobalConstants;
import com.tiandtech.core.utils.StringUtils;
import com.tiandtech.redis.SpringCacheManager;
import com.tiandtech.tenant.helper.TenantHelper;
import org.springframework.cache.Cache;

/**
 * 重写 cacheName 处理方法 支持多租户
 */
public class TenantSpringCacheManager extends SpringCacheManager {

    public TenantSpringCacheManager() {
    }

    @Override
    public Cache getCache(String name) {
        if (StringUtils.contains(name, GlobalConstants.GLOBAL_REDIS_KEY)) {
            return super.getCache(name);
        }
        String tenantId = TenantHelper.getTenantId();
        if (StringUtils.startsWith(name, tenantId)) {
            // 如果存在则直接返回
            return super.getCache(name);
        }
        return super.getCache(tenantId + ":" + name);
    }

}
