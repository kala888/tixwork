package com.tiandtech.mybatis.core.service;
//

import cn.hutool.extra.spring.SpringUtil;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.ReflectionKit;
import com.baomidou.mybatisplus.core.toolkit.support.SFunction;
import com.github.yulichang.base.MPJBaseMapper;
import com.github.yulichang.toolkit.LambdaUtils;
import com.github.yulichang.wrapper.MPJLambdaWrapper;
import com.github.yulichang.wrapper.segments.Select;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

/**
 * 基于MPJ的链式查询
 */
public class BaseQuery<T, M extends MPJBaseMapper<T>, Q extends BaseQuery> {

    protected final Logger logger = LoggerFactory.getLogger(this.getClazz());
    private Class<T> clazz;
    private MPJBaseMapper<T> baseMapper;

    private MPJLambdaWrapper<T> query = new MPJLambdaWrapper<>();

    public MPJLambdaWrapper<T> getQuery() {
        return query;
    }

    public Q setQuery(MPJLambdaWrapper<T> query) {
        this.query = query;
        return (Q) this;
    }

    protected Class<T> getClazz() {
        if (clazz == null) {
            clazz = (Class<T>) ReflectionKit.getSuperClassGenericType(this.getClass(), BaseQuery.class, 0);
        }
        return clazz;
    }

    public MPJBaseMapper<T> getBaseMapper() {
        if (baseMapper == null) {
            Class<M> mClass = (Class<M>) ReflectionKit.getSuperClassGenericType(this.getClass(), BaseQuery.class, 1);
            baseMapper = SpringUtil.getBean(mClass);
        }
        return baseMapper;
    }

    public Q query(QueryFunction<T> func) {
        func.query(this.getQuery());
        return (Q) this;
    }

    public Q selectAll() {
        query.selectAll(this.getClazz());
        return (Q) this;
    }


    protected <E> Q unSelect(SFunction<E, ?> property) {
        List<Select> columns = query.getSelectColum();
        if (columns.size() == 0) {
            logger.warn("unSelect方法必须在select方法之后调用, 这里有顺序问题");
        }
        String name = LambdaUtils.getName(property);
        List<Select> list = columns.stream()
            .filter(it -> !it.getColumProperty().equalsIgnoreCase(name)).toList();
        query.getSelectColum().clear();
        query.clear();
        query.getSelectColum().addAll(list);
        return (Q) this;
    }

    public List<T> getList() {
        return this.getBaseMapper().selectJoinList(this.getClazz(), query);
    }

    public Long getCount() {
        return this.getBaseMapper().selectCount(query);
    }

    public T getOne() {
        return this.getBaseMapper().selectJoinOne(this.getClazz(), query);
    }

    /**
     * 对于关联1:N的查询，count会有问题
     */
    public <P extends IPage<T>> P getListByPage(P page) {
        return this.getBaseMapper().selectJoinPage(page, this.getClazz(), query);
    }

}
