package com.tiandtech.mybatis.core.mapper;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.TableInfo;
import com.baomidou.mybatisplus.core.metadata.TableInfoHelper;
import com.baomidou.mybatisplus.core.toolkit.Assert;
import com.baomidou.mybatisplus.core.toolkit.ReflectionKit;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.toolkit.Db;
import com.github.yulichang.base.MPJBaseMapper;
import org.apache.ibatis.logging.Log;
import org.apache.ibatis.logging.LogFactory;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;

/**
 * 自定义 Mapper 接口, 实现 自定义扩展
 *
 * @param <T> table 泛型
 */
@SuppressWarnings("unchecked")
public interface DomainMapperPlus<T> extends MPJBaseMapper<T> {

    Log log = LogFactory.getLog(DomainMapperPlus.class);

    /**
     * 批量插入
     */
    default boolean insertBatch(Collection<T> entityList) {
        return Db.saveBatch(entityList);
    }

    /**
     * 批量更新
     */
    default boolean updateBatchById(Collection<T> entityList) {
        return Db.updateBatchById(entityList);
    }

    /**
     * 批量插入或更新
     */
    default boolean insertOrUpdateBatch(Collection<T> entityList) {
        return Db.saveOrUpdateBatch(entityList);
    }

    /**
     * 批量插入(包含限制条数)
     */
    default boolean insertBatch(Collection<T> entityList, int batchSize) {
        return Db.saveBatch(entityList, batchSize);
    }

    /**
     * 插入或更新(包含限制条数)
     */
    default boolean insertOrUpdate(T entity) {
        if (Objects.isNull(entity)) {
            return false;
        }
        Class entityClass = entity.getClass();
        TableInfo tableInfo = TableInfoHelper.getTableInfo(entityClass);
        Assert.notNull(tableInfo, "error: can not execute. because can not find cache of TableInfo for entity!");
        String keyProperty = tableInfo.getKeyProperty();
        Assert.notEmpty(keyProperty, "error: can not execute. because can not find column for id from entity!");
        Object idVal = tableInfo.getPropertyValue(entity, tableInfo.getKeyProperty());
        boolean exist = false;
        if (!StringUtils.checkValNull(idVal)) {
            exist = exists((Wrapper<T>) new QueryWrapper<>().eq(keyProperty, idVal));
        }
        return exist ? Db.updateById(entity) : Db.save(entity);
        // saveOrUpdate 有安全隐患，会根据ID去数据库查询，同时会触发子查询
//        return Db.saveOrUpdate(entity);
    }


    default List<T> selectList() {
        return this.selectList(new QueryWrapper<>());
    }

    default <C> List<C> selectObjs(Wrapper<T> wrapper, Function<? super Object, C> mapper) {
        return this.selectObjs(wrapper)
            .stream()
            .filter(Objects::nonNull)
            .map(mapper)
            .toList();
    }
}
