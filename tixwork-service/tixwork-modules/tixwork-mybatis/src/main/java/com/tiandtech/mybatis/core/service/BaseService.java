package com.tiandtech.mybatis.core.service;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.mybatis.core.domain.BaseEntity;
import com.tiandtech.mybatis.core.mapper.DomainMapperPlus;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.satoken.LoginHelper;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 常用的CURD接口，不是大而全，没有特意处理Bo和Vo，就是domain
 */
public interface BaseService<T extends BaseEntity> {

    DomainMapperPlus<T> getBaseMapper();

    QueryWrapper<T> buildQueryWrapper(T entity);

    default Page<T> listByPage(T entity, PageQuery pageQuery) {
        QueryWrapper<T> lqw = this.buildQueryWrapper(entity);
        pageQuery.setOrderBy("createTime");
        return this.getBaseMapper().selectPage(pageQuery.build(), lqw);
    }

    default List<T> list() {
        return this.getBaseMapper().selectList();
    }

    default List<T> list(T entity) {
        QueryWrapper<T> lqw = this.buildQueryWrapper(entity);
        return this.getBaseMapper().selectList(lqw);
    }

    default long count(T entity) {
        return this.getBaseMapper().selectCount(this.buildQueryWrapper(entity));
    }

    default boolean exists(T entity) {
        return this.getBaseMapper().exists(this.buildQueryWrapper(entity));
    }

    default T getById(Long id) {
        return this.getBaseMapper().selectById(id);
    }

    default T ensure(T entity) {
        // TODO 临时支持ID
        Long id = BeanUtil.getProperty(entity, "id");
        if (id != null) {
            return getById(id);
        }
        return entity;
    }


    /**
     * 保存或者更新，会多一次count by id的查询
     */
    default boolean save(T entity) {
        return this.getBaseMapper().insertOrUpdate(entity);
    }

    default boolean add(T entity) {
        int row = this.getBaseMapper().insert(entity);
        return row > 0;
    }

    default boolean update(T entity) {
        entity.setUpdateBy(LoginHelper.getUserId());
        entity.setUpdateTime(new Date());
        int row = this.getBaseMapper().updateById(entity);
        return row > 0;
    }

    default boolean deleteByIds(List<Long> ids) {
        int row = this.getBaseMapper().deleteBatchIds(ids);
        return row > 0;
    }

    default boolean saveBatch(List<T> list) {
        return this.getBaseMapper().insertBatch(list);
    }

    default List<Map<String, Object>> listMaps(Wrapper<T> queryWrapper) {
        return this.getBaseMapper().selectMaps(queryWrapper);
    }

    /**
     * 转换为VO分页
     */
    default <V> IPage<V> toVoPage(IPage<T> page, Class<V> voClass) {
        IPage<V> voPage = new Page<>(page.getCurrent(), page.getSize(), page.getTotal());
        if (CollUtil.isEmpty(page.getRecords())) {
            return voPage;
        }
        var list = BeanUtil.copyToList(page.getRecords(), voClass);
        voPage.setRecords(list);
        return voPage;
    }

    /**
     * 转换为VO列表
     */
    default <V> List<V> toVoList(List<T> list, Class<V> voClass) {
        if (CollUtil.isEmpty(list)) {
            return CollUtil.newArrayList();
        }
        return BeanUtil.copyToList(list, voClass);
    }

    /**
     * 转换为VO
     */
    default <V> V toVo(List<T> entity, Class<V> voClass) {
        if (ObjectUtil.isNull(entity)) {
            return null;
        }
        return BeanUtil.copyProperties(entity, voClass);
    }
}
