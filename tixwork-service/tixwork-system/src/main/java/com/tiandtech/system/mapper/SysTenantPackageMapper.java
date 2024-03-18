package com.tiandtech.system.mapper;

import com.tiandtech.mybatis.core.mapper.BaseMapperPlus;
import com.tiandtech.system.domain.SysTenantPackage;
import com.tiandtech.system.domain.vo.SysTenantPackageVo;
import org.springframework.stereotype.Repository;

/**
 * 租户套餐Mapper接口
 */
@Repository
public interface SysTenantPackageMapper extends BaseMapperPlus<SysTenantPackage, SysTenantPackageVo> {

}
