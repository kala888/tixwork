package com.tiandtech.system.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.core.constant.TenantConstants;
import com.tiandtech.core.exception.ServiceException;
import com.tiandtech.core.utils.MapstructUtils;
import com.tiandtech.core.utils.StringUtils;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.system.domain.SysTenant;
import com.tiandtech.system.domain.SysTenantPackage;
import com.tiandtech.system.domain.bo.SysTenantPackageBo;
import com.tiandtech.system.domain.vo.SysTenantPackageVo;
import com.tiandtech.system.mapper.SysTenantMapper;
import com.tiandtech.system.mapper.SysTenantPackageMapper;
import com.tiandtech.system.service.SysTenantPackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * 租户套餐Service业务层处理
 */
@RequiredArgsConstructor
@Service
public class SysTenantPackageServiceImpl implements SysTenantPackageService {

    private final SysTenantPackageMapper baseMapper;
    private final SysTenantMapper tenantMapper;

    /**
     * 查询租户套餐
     */
    @Override
    public SysTenantPackageVo getById(Long packageId) {
        return baseMapper.selectVoById(packageId);
    }

    /**
     * 查询租户套餐列表
     */
    @Override
    public Page<SysTenantPackageVo> listByPage(SysTenantPackageBo bo, PageQuery pageQuery) {
        LambdaQueryWrapper<SysTenantPackage> lqw = buildQueryWrapper(bo);
        return baseMapper.selectVoPage(pageQuery.build(), lqw);
    }

    @Override
    public List<SysTenantPackageVo> list() {
        return baseMapper.selectVoList(new LambdaQueryWrapper<SysTenantPackage>()
            .eq(SysTenantPackage::getStatus, TenantConstants.NORMAL));
    }

    /**
     * 查询租户套餐列表
     */
    @Override
    public List<SysTenantPackageVo> list(SysTenantPackageBo bo) {
        LambdaQueryWrapper<SysTenantPackage> lqw = buildQueryWrapper(bo);
        return baseMapper.selectVoList(lqw);
    }

    private LambdaQueryWrapper<SysTenantPackage> buildQueryWrapper(SysTenantPackageBo bo) {
        Map<String, Object> params = bo.getParams();
        LambdaQueryWrapper<SysTenantPackage> lqw = Wrappers.lambdaQuery();
        lqw.like(StringUtils.isNotBlank(bo.getPackageName()), SysTenantPackage::getPackageName, bo.getPackageName());
        lqw.eq(StringUtils.isNotBlank(bo.getStatus()), SysTenantPackage::getStatus, bo.getStatus());
        return lqw;
    }

    /**
     * 新增租户套餐
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean insert(SysTenantPackageBo bo) {
        SysTenantPackage add = MapstructUtils.convert(bo, SysTenantPackage.class);
        boolean flag = baseMapper.insert(add) > 0;
        if (flag) {
            bo.setId(add.getId());
        }
        return flag;
    }

    /**
     * 修改租户套餐
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean update(SysTenantPackageBo bo) {
        SysTenantPackage update = MapstructUtils.convert(bo, SysTenantPackage.class);
        return baseMapper.updateById(update) > 0;
    }

    /**
     * 修改套餐状态
     *
     * @param bo 套餐信息
     * @return 结果
     */
    @Override
    public int updateMenus(SysTenantPackageBo bo) {
        SysTenantPackage tenantPackage = MapstructUtils.convert(bo, SysTenantPackage.class);
        return baseMapper.updateById(tenantPackage);
    }

    /**
     * 批量删除租户套餐
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean deleteWithValidByIds(Collection<Long> ids, Boolean isValid) {
        if (isValid) {
            boolean exists = tenantMapper.exists(new LambdaQueryWrapper<SysTenant>().in(SysTenant::getPackageId, ids));
            if (exists) {
                throw new ServiceException("租户套餐已被使用");
            }
        }
        return baseMapper.deleteBatchIds(ids) > 0;
    }
}
