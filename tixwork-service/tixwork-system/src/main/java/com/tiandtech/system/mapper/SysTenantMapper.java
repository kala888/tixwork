package com.tiandtech.system.mapper;

import com.tiandtech.mybatis.core.mapper.BaseMapperPlus;
import com.tiandtech.system.domain.SysTenant;
import com.tiandtech.system.domain.vo.SysTenantVo;
import org.springframework.stereotype.Repository;

/**
 * 租户Mapper接口
 */
@Repository
public interface SysTenantMapper extends BaseMapperPlus<SysTenant, SysTenantVo> {

}
