package com.tiandtech.mybatis.handler;

import cn.hutool.core.bean.BeanUtil;
import com.tiandtech.mybatis.core.domain.BaseEntity;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * MP中的property="company.id"在select * 的时候，不能正确组装对象，需要手动as：   c.id as "company.id"
 */
public class ObjectLinkTypeHandler<T extends BaseEntity> extends BaseTypeHandler<T> {

    private final Class<T> clazz;

    public ObjectLinkTypeHandler(Class<T> clazz) {
        this.clazz = clazz;
    }

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, T entity, JdbcType jdbcType) throws SQLException {
        Long id = entity.getId();
        ps.setLong(i, id);
    }

    @Override
    public T getNullableResult(ResultSet rs, String columnName) throws SQLException {
        if (rs.getObject(columnName) != null) {
            return this.getResult(rs.getLong(columnName));
        }
        return null;
    }

    @Override
    public T getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        if (rs.getObject(columnIndex) != null) {
            return this.getResult(rs.getLong(columnIndex));
        }
        return null;
    }

    @Override
    public T getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        if (cs.getObject(columnIndex) != null) {
            return this.getResult(cs.getLong(columnIndex));
        }
        return null;
    }

    @Override
    public T getResult(ResultSet rs, int columnIndex) throws SQLException {
        if (rs.getObject(columnIndex) != null) {
            return this.getResult(rs.getLong(columnIndex));
        }
        return null;
    }

    @Override
    public T getResult(ResultSet rs, String columnName) throws SQLException {
        if (rs.getObject(columnName) != null) {
            return this.getResult(rs.getLong(columnName));
        }
        return null;
    }

    @Override
    public T getResult(CallableStatement cs, int columnIndex) throws SQLException {
        if (cs.getObject(columnIndex) != null) {
            return this.getResult(cs.getLong(columnIndex));
        }
        return null;
    }

    private T getResult(Long id) {
        if (id == null) {
            return null;
        }
        BaseEntity entity = new BaseEntity();
        entity.setId(id);
        return BeanUtil.copyProperties(entity, clazz);
    }
}
