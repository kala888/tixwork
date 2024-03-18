package com.tiandtech.system.mapper;

import com.tiandtech.mybatis.core.mapper.BaseMapperPlus;
import com.tiandtech.system.domain.SysRoleMenu;
import org.springframework.stereotype.Repository;

/**
 * 角色与菜单关联表 数据层
 */
@Repository
public interface SysRoleMenuMapper extends BaseMapperPlus<SysRoleMenu, SysRoleMenu> {

}
