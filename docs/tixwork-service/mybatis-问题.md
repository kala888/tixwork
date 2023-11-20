在生成的时候

1. 需要指定 resultMap = "ProductResult"，与xml中一致。 xml中定义的association的才能执行
```xml
 <association property="series" column="series"
            select="com.tiandtech.teachain.mapper.ProductSeriesMapper.selectById"/>
```

2. 指定autoResultMap="true"， 需要指定typeHandler