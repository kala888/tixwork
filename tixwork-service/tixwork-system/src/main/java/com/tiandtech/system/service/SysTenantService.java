package com.tiandtech.system.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.system.domain.bo.SysTenantBo;
import com.tiandtech.system.domain.vo.SysTenantVo;

import java.util.Collection;
import java.util.List;

/**
 * 租户Service接口
 */
public interface SysTenantService {

    /**
     * 查询租户
     */
    SysTenantVo getById(Long id);

    /**
     * 基于租户ID查询租户
     */
    SysTenantVo getByTenantId(String tenantId);

    /**
     * 查询租户列表
     */
    Page<SysTenantVo> listByPage(SysTenantBo bo, PageQuery pageQuery);

    /**
     * 查询租户列表
     */
    List<SysTenantVo> list(SysTenantBo bo);

    /**
     * 新增租户
     */
    Boolean insert(SysTenantBo bo);

    /**
     * 修改租户
     */
    Boolean update(SysTenantBo bo);

    /**
     * 修改租户状态
     */
//    int updateTenantStatus(SysTenantBo bo);

    /**
     * 校验租户是否允许操作
     */
    void checkTenantAllowed(String tenantId);

    /**
     * 校验并批量删除租户信息
     */
    Boolean deleteWithValidByIds(Collection<Long> ids, Boolean isValid);

    /**
     * 校验企业名称是否唯一
     */
    boolean checkCompanyUnique(SysTenantBo bo);

    /**
     * 校验账号余额
     */
    boolean checkAccountBalance(String tenantId);

    /**
     * 校验有效期
     */
//    boolean checkExpireTime(String tenantId);

    /**
     * 同步租户套餐
     */
    Boolean syncTenantPackage(String tenantId);
}
