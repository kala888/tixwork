package com.tiandtech.system.service.impl;

import cn.dev33.satoken.context.SaHolder;
import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.base.enums.ConfigDataScope;
import com.tiandtech.base.utils.Getter;
import com.tiandtech.core.constant.CacheConstants;
import com.tiandtech.core.constant.CacheNames;
import com.tiandtech.core.constant.UserConstants;
import com.tiandtech.core.exception.ServiceException;
import com.tiandtech.core.service.ConfigService;
import com.tiandtech.core.service.DictService;
import com.tiandtech.core.utils.SpringUtils;
import com.tiandtech.core.utils.StreamUtils;
import com.tiandtech.core.utils.StringUtils;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.redis.CacheUtils;
import com.tiandtech.system.domain.SysConfig;
import com.tiandtech.system.mapper.SysConfigMapper;
import com.tiandtech.system.service.SysConfigService;
import com.tiandtech.tenant.helper.TenantHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * 参数配置 服务层实现
 */
@RequiredArgsConstructor
@Service
public class SysConfigServiceImpl implements SysConfigService, ConfigService, DictService {

    private final SysConfigMapper baseMapper;

//    /**
//     * 项目启动时，初始化参数到缓存
//     */
//    @PostConstruct
//    public void init() {
//        loadingDictCache();
//    }
//
//    /**
//     * 加载参数缓存数据
//     */
//    @Override
//    public void loadingDictCache() {
//        List<SysConfig> configsList = list(new SysConfig());
//        configsList.forEach(config ->
//            CacheUtils.put(CacheNames.SYS_CONFIG, config.getKey(), config.getValue())
//        );
//    }

    @Override
    public Page<SysConfig> listByPage(SysConfig config, PageQuery pageQuery) {
        LambdaQueryWrapper<SysConfig> lqw = buildQueryWrapper(config);
        return baseMapper.selectPage(pageQuery.build(), lqw);
    }


    /**
     * 查询参数配置列表
     *
     * @param config 参数配置信息
     * @return 参数配置集合
     */
    @Override
    public List<SysConfig> list(SysConfig config) {
        LambdaQueryWrapper<SysConfig> lqw = buildQueryWrapper(config);
        return baseMapper.selectList(lqw);
    }

    /**
     * 查询参数配置信息
     *
     * @param configId 参数配置ID
     * @return 参数配置信息
     */
    @Override
    @DS("master")
    public SysConfig getById(Long configId) {
        return baseMapper.selectById(configId);
    }

    /**
     * 根据键名查询参数配置信息
     * TODO 测试一个切换不同tenantId缓存数据是啥
     *
     * @param configKey 参数key
     * @return 参数键值
     */
    @Cacheable(cacheNames = CacheNames.SYS_CONFIG, key = "#configKey")
    @Override
    @DS("master")
    public SysConfig getByKey(String configKey) {
        return baseMapper.selectOne(new LambdaQueryWrapper<SysConfig>()
            .eq(SysConfig::getKey, configKey));
    }

    /**
     * 获取注册开关
     *
     * @param tenantId 租户id
     * @return true开启，false关闭
     */
    @Override
    public boolean selectRegisterEnabled(String tenantId) {
        SysConfig retConfig = baseMapper.selectOne(new LambdaQueryWrapper<SysConfig>()
            .eq(SysConfig::getKey, "sys.account.registerUser")
            .eq(TenantHelper.isEnable(), SysConfig::getTenantId, tenantId));
        if (ObjectUtil.isNull(retConfig)) {
            return false;
        }
        return Convert.toBool(retConfig.getValue());
    }

    private LambdaQueryWrapper<SysConfig> buildQueryWrapper(SysConfig config) {
        Map<String, Object> params = config.getParams();
        LambdaQueryWrapper<SysConfig> lqw = Wrappers.lambdaQuery();
        lqw.like(StringUtils.isNotBlank(config.getTitle()), SysConfig::getTitle, config.getTitle());
        lqw.eq(config.getType() != null, SysConfig::getType, config.getType());
        if (Getter.get(() -> config.getParent().getId()).isPresent()) {
            lqw.eq(SysConfig::getParent, config.getParent().getId());
        }
        lqw.like(StringUtils.isNotBlank(config.getKey()), SysConfig::getKey, config.getKey());
        lqw.between(params.get("beginTime") != null && params.get("endTime") != null,
            SysConfig::getCreateTime, params.get("beginTime"), params.get("endTime"));
        return lqw;
    }

    /**
     * 新增参数配置
     */
//    @CachePut(cacheNames = CacheNames.SYS_CONFIG, key = "#config.key")
    @Override
    public String insert(SysConfig config) {
//        SysConfig config = MapstructUtils.convert(bo, SysConfig.class);
        int row = baseMapper.insert(config);
        if (row > 0) {
            return config.getValue();
        }
        throw new ServiceException("操作失败");
    }

    /**
     * 修改参数配置
     */
//    @CachePut(cacheNames = CacheNames.SYS_CONFIG, key = "#config.key")
    @Override
    public String update(SysConfig config) {
        int row = 0;
//        SysConfig config = MapstructUtils.convert(bo, SysConfig.class);
        if (config.getId() != null) {
            SysConfig temp = baseMapper.selectById(config.getId());
            if (!StringUtils.equals(temp.getKey(), config.getKey())) {
                CacheUtils.evict(CacheNames.SYS_CONFIG, temp.getKey());
            }
            row = baseMapper.updateById(config);
        } else {
            row = baseMapper.update(config, new LambdaQueryWrapper<SysConfig>()
                .eq(SysConfig::getKey, config.getKey()));
        }
        if (row > 0) {
            return config.getValue();
        }
        throw new ServiceException("操作失败");
    }

    /**
     * 批量删除参数信息
     *
     * @param configIds 需要删除的参数ID
     */
    @Override
    public void deleteByIds(Long[] configIds) {
        for (Long configId : configIds) {
            SysConfig config = baseMapper.selectById(configId);
            if (config.getDataScope() == ConfigDataScope.SYSTEM) {
                throw new ServiceException(String.format("内置参数【%1$s】不能删除 ", config.getKey()));
            }
            CacheUtils.evict(CacheNames.SYS_CONFIG, config.getKey());
        }
        baseMapper.deleteBatchIds(Arrays.asList(configIds));
    }

    /**
     * 重置参数缓存数据
     */
    @Override
    public void resetConfigCache() {
        CacheUtils.clear(CacheNames.SYS_CONFIG);
    }

    /**
     * 校验参数键名是否唯一
     *
     * @param config 参数配置信息
     * @return 结果
     */
    @Override
    public boolean checkConfigKeyUnique(SysConfig config) {
        long configId = ObjectUtil.isNull(config.getId()) ? -1L : config.getId();
        SysConfig info = baseMapper.selectOne(new LambdaQueryWrapper<SysConfig>().eq(SysConfig::getKey, config.getKey()));
        if (ObjectUtil.isNotNull(info) && info.getId() != configId) {
            return false;
        }
        return true;
    }

    /**
     * 根据参数 key 获取参数值
     *
     * @param configKey 参数 key
     * @return 参数值
     */
    @Override
    public String getConfigValue(String configKey) {
        SysConfig config = SpringUtils.getAopProxy(this).getByKey(configKey);
        if (ObjectUtil.isNotNull(config)) {
            return config.getValue();
        }
        return StringUtils.EMPTY;
    }


    private SysConfig fastCache(String key) {
        String cacheKey = CacheConstants.SYS_CONFIG_KEY + key;
        // 优先从本地缓存获取
        SysConfig config = (SysConfig) SaHolder.getStorage().get(cacheKey);
        if (ObjectUtil.isNull(config)) {
            config = SpringUtils.getAopProxy(this).getByKey(key);
            SaHolder.getStorage().set(cacheKey, config);
        }
        return config;
    }


    @Override
    public String getDictLabel(String key, String dictValue, String separator) {
        return processDictValue(key, dictValue, separator, SysConfig::getValue, SysConfig::getTitle);
    }

    @Override
    public String getDictValue(String key, String dictLabel, String separator) {
        return processDictValue(key, dictLabel, separator, SysConfig::getTitle, SysConfig::getValue);
    }

    private String processDictValue(String key, String dictValue, String separator,
                                    Function<SysConfig, String> keyExtractor,
                                    Function<SysConfig, String> valueExtractor) {
        SysConfig cfg = fastCache(key);
        List<SysConfig> values = cfg.getValues();
        Map<String, String> map = values.stream()
            .collect(Collectors.toMap(keyExtractor, valueExtractor));

        return Arrays.stream(dictValue.split(separator))
            .map(v -> map.getOrDefault(v, StringUtils.EMPTY))
            .collect(Collectors.joining(separator));
    }

    @Override
    @Cacheable(cacheNames = CacheNames.SYS_CONFIG, key = "#key")
    public SysConfig selectPublicDictByKey(String key) {
        return baseMapper.selectOne(new LambdaQueryWrapper<SysConfig>()
            .eq(SysConfig::getKey, key)
            .eq(SysConfig::getStatus, UserConstants.DICT_NORMAL)
            .eq(SysConfig::getDataScope, ConfigDataScope.PUBLIC)
        );
    }

    @Override
    public Map<String, String> getAllDictByDictType(String dictType) {
        SysConfig config = getByKey(dictType);

        return StreamUtils.toMap(config.getValues(), SysConfig::getValue, SysConfig::getTitle);
    }

}
