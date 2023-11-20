#### 1. 只有自己的数据权限

1） 创建角色“X”，并设置角色权限为“仅本人数据权限”。 (操作)

2） 设置用户角色“X”。(操作)

3） mapper层Interface（只能）增加DataPermission注解。(代码)

```java
@DataPermission({
    @DataColumn(key = "userName", value = "user_id")
})
public interface ProjectMapper extends BaseMapperPlus<ProjectMapper, Project, Project> {

}
```

4）数据增加字段user_id。(代码)
