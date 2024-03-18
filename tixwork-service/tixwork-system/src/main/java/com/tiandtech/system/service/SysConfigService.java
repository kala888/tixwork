package com.tiandtech.system.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.core.service.ConfigService;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.system.domain.SysConfig;

import java.util.List;

/**
 * 参数配置 服务层
 */
public interface SysConfigService extends ConfigService {


    Page<SysConfig> listByPage(SysConfig config, PageQuery pageQuery);

    /**
     * 查询参数配置信息
     *
     * @param configId 参数配置ID
     * @return 参数配置信息
     */
    SysConfig getById(Long configId);

    /**
     * 根据键名查询参数配置信息
     *
     * @param key 参数键名
     */
    SysConfig getByKey(String key);

    /**
     * 获取注册开关
     *
     * @param tenantId 租户id
     * @return true开启，false关闭
     */
    boolean selectRegisterEnabled(String tenantId);

    /**
     * 查询参数配置列表
     *
     * @param config 参数配置信息
     * @return 参数配置集合
     */
    List<SysConfig> list(SysConfig config);

    /**
     * 新增参数配置
     *
     * @param bo 参数配置信息
     * @return 结果
     */
    String insert(SysConfig bo);

    /**
     * 修改参数配置
     *
     * @param bo 参数配置信息
     * @return 结果
     */
    String update(SysConfig bo);

    /**
     * 批量删除参数信息
     *
     * @param configIds 需要删除的参数ID
     */
    void deleteByIds(Long[] configIds);

    /**
     * 重置参数缓存数据
     */
    void resetConfigCache();

    /**
     * 校验参数键名是否唯一
     *
     * @param config 参数信息
     * @return 结果
     */
    boolean checkConfigKeyUnique(SysConfig config);


    /**
     * 查询参数配置信息
     *
     * @param key 参数配置key值
     * @return 参数配置信息
     */
    SysConfig selectPublicDictByKey(String key);

}
