package com.tiandtech.web.domain.vo;

import lombok.Data;

import java.util.List;

/**
 * 登录租户对象
 */
@Data
public class LoginTenantVo {

    /**
     * 租户开关
     */
    private Boolean tenantEnabled;

    /**
     * 租户对象列表
     */
    private List<TenantListVo> voList;

}
