### MyBatis 相关

#### 1.MyBatisConfig 进行java 配置

     1) 加载com.tiantech.**.domain下的Entity为typeAliases
     2) 加载classpath*:mapper/**/*Mapper.xml下的xml为mapper
     3) 加载mybatis-config.xml下的基本setting

```yaml
mybatis:
  # 搜索指定包别名
  typeAliasesPackage: com.tiandtech.**.domain
  # 配置mapper的扫描，找到所有的mapper.xml映射文件
  mapperLocations: classpath*:mapper/**/*Mapper.xml
  # 加载全局的配置文件
  configLocation: classpath:mybatis/mybatis-config.xml

```

#### 2. Application 找那个开启扫描

    @MapperScan("com.tiandtech.**.mapper") 注册映射器
    mapper包下的类为映射器

#### 3.使用样例 rest请求 /tool/gen/list

##### 3.1、创建GenTable domain

```
GenTable
```

##### 3.2、创建Mapper（接口）

```
GenTableMapper
查询方法  public List<GenTable> selectGenTableList(GenTable genTable);
```

##### 3.3、resources下创建Mapper映射文件

    mapper.xxx/GenTableMapper.xml
    1）定义resultMap，映射column和dom的成员变量：<resultMap type="GenTable" id="GenTableResult">
    2）定义查询，映射sql到resultmap：   <select id="selectGenTableList" parameterType="GenTable" resultMap="GenTableResult">

##### 3.4、Service实现GenTableService

```java
    @Override
public List<GenTable> selectGenTableList(GenTable genTable){
        return genTableMapper.selectGenTableList(genTable);
}
```

##### 3.5.Controller实现

    开启分页, 调用service
