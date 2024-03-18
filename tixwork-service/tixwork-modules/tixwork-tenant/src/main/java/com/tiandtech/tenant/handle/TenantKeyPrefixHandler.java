package com.tiandtech.tenant.handle;

import com.tiandtech.core.constant.GlobalConstants;
import com.tiandtech.core.utils.StringUtils;
import com.tiandtech.redis.KeyPrefixHandler;
import com.tiandtech.tenant.helper.TenantHelper;

/**
 * 多租户redis缓存key前缀处理
 */
public class TenantKeyPrefixHandler extends KeyPrefixHandler {

    public TenantKeyPrefixHandler(String keyPrefix) {
        super(keyPrefix);
    }

    /**
     * 增加前缀
     */
    @Override
    public String map(String name) {
        if (StringUtils.isBlank(name)) {
            return null;
        }
        if (StringUtils.contains(name, GlobalConstants.GLOBAL_REDIS_KEY)) {
            return super.map(name);
        }
        String tenantId = TenantHelper.getTenantId();
        if (StringUtils.startsWith(name, tenantId)) {
            // 如果存在则直接返回
            return super.map(name);
        }
        return super.map(tenantId + ":" + name);
    }

    /**
     * 去除前缀
     */
    @Override
    public String unmap(String name) {
        String unmap = super.unmap(name);
        if (StringUtils.isBlank(unmap)) {
            return null;
        }
        if (StringUtils.contains(name, GlobalConstants.GLOBAL_REDIS_KEY)) {
            return super.unmap(name);
        }
        String tenantId = TenantHelper.getTenantId();
        if (StringUtils.startsWith(unmap, tenantId)) {
            // 如果存在则删除
            return unmap.substring((tenantId + ":").length());
        }
        return unmap;
    }

}
