package com.tiandtech.system.service.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.core.constant.CacheNames;
import com.tiandtech.core.exception.ServiceException;
import com.tiandtech.core.utils.MapstructUtils;
import com.tiandtech.core.utils.StreamUtils;
import com.tiandtech.core.utils.StringUtils;
import com.tiandtech.json.JsonUtils;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.oss.client.OssConstant;
import com.tiandtech.redis.CacheUtils;
import com.tiandtech.redis.RedisUtils;
import com.tiandtech.system.domain.SysOssConfig;
import com.tiandtech.system.domain.bo.SysOssConfigBo;
import com.tiandtech.system.domain.vo.SysOssConfigVo;
import com.tiandtech.system.mapper.SysOssConfigMapper;
import com.tiandtech.system.service.SysOssConfigService;
import com.tiandtech.tenant.core.TenantEntity;
import com.tiandtech.tenant.helper.TenantHelper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * 对象存储配置Service业务层处理
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class SysOssConfigServiceImpl implements SysOssConfigService {

    private final SysOssConfigMapper baseMapper;

    /**
     * 项目启动时，初始化参数到缓存，加载配置类
     */
    @Override
    public void init() {
//        List<SysOssConfig> list = baseMapper.selectList();
//        list.forEach(config -> {
//            String configKey = config.getConfigKey();
//            if ("0".equals(config.getStatus())) {
//                RedisUtils.setCacheObject(OssConstant.DEFAULT_CONFIG_KEY, configKey);
//            }
//            CacheUtils.put(CacheNames.SYS_OSS_CONFIG, config.getConfigKey(), JsonUtils.toJsonString(config));
//        });

        List<SysOssConfig> list = TenantHelper.ignore(() ->
            baseMapper.selectList(
                new LambdaQueryWrapper<SysOssConfig>().orderByAsc(TenantEntity::getTenantId))
        );
        Map<String, List<SysOssConfig>> map = StreamUtils.groupByKey(list, SysOssConfig::getTenantId);
        try {
            for (String tenantId : map.keySet()) {
                TenantHelper.setDynamic(tenantId);
                // 加载OSS初始化配置
                for (SysOssConfig config : map.get(tenantId)) {
                    String configKey = config.getConfigKey();
                    if ("0".equals(config.getStatus())) {
                        RedisUtils.setCacheObject(OssConstant.DEFAULT_CONFIG_KEY, configKey);
                    }
                    CacheUtils.put(CacheNames.SYS_OSS_CONFIG, config.getConfigKey(), JsonUtils.toJsonString(config));
                }
            }
        } finally {
            TenantHelper.clearDynamic();
        }
    }

    @Override
    public SysOssConfigVo getById(Long ossConfigId) {
        return baseMapper.selectVoById(ossConfigId);
    }

    @Override
    public Page<SysOssConfigVo> listByPage(SysOssConfigBo bo, PageQuery pageQuery) {
        LambdaQueryWrapper<SysOssConfig> lqw = buildQueryWrapper(bo);
        return baseMapper.selectVoPage(pageQuery.build(), lqw);
    }


    private LambdaQueryWrapper<SysOssConfig> buildQueryWrapper(SysOssConfigBo bo) {
        LambdaQueryWrapper<SysOssConfig> lqw = Wrappers.lambdaQuery();
        lqw.eq(StringUtils.isNotBlank(bo.getConfigKey()), SysOssConfig::getConfigKey, bo.getConfigKey());
        lqw.like(StringUtils.isNotBlank(bo.getBucketName()), SysOssConfig::getBucketName, bo.getBucketName());
        lqw.eq(StringUtils.isNotBlank(bo.getStatus()), SysOssConfig::getStatus, bo.getStatus());
        return lqw;
    }

    @Override
    public Boolean insert(SysOssConfigBo bo) {
        SysOssConfig config = MapstructUtils.convert(bo, SysOssConfig.class);
        validEntityBeforeSave(config);
        boolean flag = baseMapper.insert(config) > 0;
        if (flag) {
            CacheUtils.put(CacheNames.SYS_OSS_CONFIG, config.getConfigKey(), JsonUtils.toJsonString(config));
        }
        return flag;
    }

    @Override
    public Boolean update(SysOssConfigBo bo) {
        SysOssConfig config = MapstructUtils.convert(bo, SysOssConfig.class);
        validEntityBeforeSave(config);
        LambdaUpdateWrapper<SysOssConfig> luw = new LambdaUpdateWrapper<>();
        luw.set(ObjectUtil.isNull(config.getPrefix()), SysOssConfig::getPrefix, "");
        luw.set(ObjectUtil.isNull(config.getRegion()), SysOssConfig::getRegion, "");
        luw.set(ObjectUtil.isNull(config.getExt1()), SysOssConfig::getExt1, "");
        luw.set(ObjectUtil.isNull(config.getRemark()), SysOssConfig::getRemark, "");
        luw.eq(SysOssConfig::getId, config.getId());
        boolean flag = baseMapper.update(config, luw) > 0;
        if (flag) {
            CacheUtils.put(CacheNames.SYS_OSS_CONFIG, config.getConfigKey(), JsonUtils.toJsonString(config));
        }
        return flag;
    }

    /**
     * 保存前的数据校验
     */
    private void validEntityBeforeSave(SysOssConfig entity) {
        if (StringUtils.isNotEmpty(entity.getConfigKey())
            && !checkConfigKeyUnique(entity)) {
            throw new ServiceException("操作配置'" + entity.getConfigKey() + "'失败, 配置key已存在!");
        }
    }

    @Override
    public Boolean deleteWithValidByIds(Collection<Long> ids, Boolean isValid) {
        if (isValid) {
            if (CollUtil.containsAny(ids, OssConstant.SYSTEM_DATA_IDS)) {
                throw new ServiceException("系统内置, 不可删除!");
            }
        }
        List<SysOssConfig> list = CollUtil.newArrayList();
        for (Long configId : ids) {
            SysOssConfig config = baseMapper.selectById(configId);
            list.add(config);
        }
        boolean flag = baseMapper.deleteBatchIds(ids) > 0;
        if (flag) {
            list.forEach(sysOssConfig ->
                CacheUtils.evict(CacheNames.SYS_OSS_CONFIG, sysOssConfig.getConfigKey()));
        }
        return flag;
    }

    /**
     * 判断configKey是否唯一
     */
    private boolean checkConfigKeyUnique(SysOssConfig sysOssConfig) {
        long ossConfigId = ObjectUtil.isNull(sysOssConfig.getId()) ? -1L : sysOssConfig.getId();
        SysOssConfig info = baseMapper.selectOne(new LambdaQueryWrapper<SysOssConfig>()
            .select(SysOssConfig::getId, SysOssConfig::getConfigKey)
            .eq(SysOssConfig::getConfigKey, sysOssConfig.getConfigKey()));
        if (ObjectUtil.isNotNull(info) && info.getId() != ossConfigId) {
            return false;
        }
        return true;
    }

    /**
     * 启用禁用状态
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int updateOssConfigStatus(SysOssConfigBo bo) {
        SysOssConfig sysOssConfig = MapstructUtils.convert(bo, SysOssConfig.class);
        int row = baseMapper.update(null, new LambdaUpdateWrapper<SysOssConfig>()
            .set(SysOssConfig::getStatus, "1"));
        row += baseMapper.updateById(sysOssConfig);
        if (row > 0) {
            RedisUtils.setCacheObject(OssConstant.DEFAULT_CONFIG_KEY, sysOssConfig.getConfigKey());
        }
        return row;
    }

}
