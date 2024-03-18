package com.tiandtech.web.domain.vo;

import com.tiandtech.system.domain.vo.SysTenantVo;
import io.github.linpeilie.annotations.AutoMapper;
import lombok.Data;

/**
 * 租户列表
 */
@Data
@AutoMapper(target = SysTenantVo.class)
public class TenantListVo {

    private String tenantId;

    private String companyName;

    private String domain;

}
