package com.tiandtech.mybatis.handler;


import cn.hutool.json.JSONUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;
import com.tiandtech.core.utils.StringUtils;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@MappedJdbcTypes(JdbcType.VARCHAR) // 数据库中该字段存储的类型
@MappedTypes(List.class) // 需要转换的对象
public class ListOfLongTypeHandler extends BaseTypeHandler<List<Long>> {

    private static ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void setNonNullParameter(PreparedStatement preparedStatement, int i, List<Long> longs, JdbcType jdbcType) throws SQLException {
        String json = JSONUtil.toJsonStr(longs);
        preparedStatement.setObject(i, json);
    }

    @Override
    public List<Long> getNullableResult(ResultSet resultSet, String columnName) throws SQLException {
        String value = resultSet.getString(columnName);
        return getLongs(value);
    }


    @Override
    public List<Long> getNullableResult(ResultSet resultSet, int i) throws SQLException {
        String value = resultSet.getString(i);

        return getLongs(value);
    }

    @Override
    public List<Long> getNullableResult(CallableStatement callableStatement, int i) throws SQLException {
        String value = callableStatement.getString(i);

        return getLongs(value);
    }

    private List<Long> getLongs(String value) {
        if (StringUtils.isNotBlank(value)) {
            try {
                CollectionType type = objectMapper.getTypeFactory().constructCollectionType(ArrayList.class, Long.class);
                List<Long> result = objectMapper.readValue(value, type);
                //List<Long> longs = JsonUtil.parseArray(value, Long.class);
                return result;
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }
        return null;
    }
}

