package com.tiandtech.system.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.system.domain.bo.SysTenantPackageBo;
import com.tiandtech.system.domain.vo.SysTenantPackageVo;

import java.util.Collection;
import java.util.List;

/**
 * 租户套餐Service接口
 */
public interface SysTenantPackageService {

    /**
     * 查询租户套餐
     */
    SysTenantPackageVo getById(Long packageId);

    /**
     * 查询租户套餐列表
     */
    Page<SysTenantPackageVo> listByPage(SysTenantPackageBo bo, PageQuery pageQuery);

    /**
     * 查询租户套餐已启用列表
     */
    List<SysTenantPackageVo> list();

    /**
     * 查询租户套餐列表
     */
    List<SysTenantPackageVo> list(SysTenantPackageBo bo);

    /**
     * 新增租户套餐
     */
    Boolean insert(SysTenantPackageBo bo);

    /**
     * 修改租户套餐
     */
    Boolean update(SysTenantPackageBo bo);

    /**
     * 修改套餐状态
     */
    int updateMenus(SysTenantPackageBo bo);

    /**
     * 校验并批量删除租户套餐信息
     */
    Boolean deleteWithValidByIds(Collection<Long> ids, Boolean isValid);
}
