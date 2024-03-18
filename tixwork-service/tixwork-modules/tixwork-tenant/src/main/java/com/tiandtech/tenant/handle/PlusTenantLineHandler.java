package com.tiandtech.tenant.handle;

import cn.hutool.core.collection.ListUtil;
import cn.hutool.core.util.NumberUtil;
import com.baomidou.mybatisplus.extension.plugins.handler.TenantLineHandler;
import com.tiandtech.core.utils.StringUtils;
import com.tiandtech.satoken.LoginHelper;
import com.tiandtech.tenant.helper.TenantHelper;
import com.tiandtech.tenant.properties.TenantProperties;
import lombok.AllArgsConstructor;
import net.sf.jsqlparser.expression.Expression;
import net.sf.jsqlparser.expression.NullValue;
import net.sf.jsqlparser.expression.StringValue;

import java.util.List;

/**
 * 自定义租户处理器
 */
@AllArgsConstructor
public class PlusTenantLineHandler implements TenantLineHandler {

    private final TenantProperties tenantProperties;

    @Override
    public Expression getTenantId() {
        String tenantId = LoginHelper.getTenantId();
        if (StringUtils.isBlank(tenantId)) {
            return new NullValue();
        }
        String dynamicTenantId = TenantHelper.getDynamic();
        if (StringUtils.isNotBlank(dynamicTenantId) && NumberUtil.isNumber(dynamicTenantId)) {
            // 返回动态租户
            return new StringValue(dynamicTenantId);
        }
        // 返回固定租户
        return new StringValue(tenantId);
    }

    @Override
    public boolean ignoreTable(String tableName) {
        String tenantId = LoginHelper.getTenantId();
        // 判断是否有租户
        if (StringUtils.isNotBlank(tenantId)) {
            // 不需要过滤租户的表
            List<String> excludes = tenantProperties.getExcludes();
            // 非业务表
            List<String> tables = ListUtil.toList(
                "gen_table",
                "gen_table_column"
            );
            tables.addAll(excludes);
            return tables.contains(tableName);
        }
        return true;
    }

}
