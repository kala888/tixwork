已经更新到

```
ruoyi-vue-plus: 301111fffde654b6151a27dc35657890364400b9 
2023年8月21日 GMT+8 14:08:12
 
```

开发环境默认开启，可以使用apifox或者postman导入：

openApi docs：http://localhost:8080/api/v3/api-docs

注意gradle： implementation不具有依赖传递性， api传递模块依赖

##### Tip1 打生产的包
    
    如果不指定 -Pprod怎打的是开发的包。

    gradle 会在打包时，替换application中的 #spring.profiles.active#

```shell
gradle -Pprod bJ
```

##### Tip2 JVM 参数 和启动

``` shell
export JAVA_OPTS= '-Xms2G -Xmx4G -XX:MetaspaceSize=512m -XX:+UseG1GC -XX:MaxGCPauseMillis=200 -XX:ParallelGCThreads=4 -XX:ConcGCThreads=2 -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=./log/ -XX:InitiatingHeapOccupancyPercent=70 -XX:ErrorFile=./log/error.log -Dfile.encoding=UTF-8 -Duser.timezone=Asia/Shanghai'
nohup java ${JAVA_OPTS} -jar /app/app.jar &
```

##### Tip3 启动并调试端口：5005

```shell
 gradle bR --debug-jvm
```

```javascript
//tips:
//   tixwork-service 重构后，大部分代码来自[RuoYi-Vue-Plus v5.X](https://gitee.com/dromara/RuoYi-Vue-Plus) ，感谢 疯狂的狮子Li, 感谢若依。
//   如果您通过后台获得了帮助，开源不易，请去打赏《疯狂的狮子Li》
```


#### 非api module，获取自身模块中的文件的三种方式：
```java
InputStream stream =  cn.hutool.core.io.resource.ResourceUtil.getStreamSafe(file);
Resource resource = resourceLoader.getResource("classpath:" + file);
InputStream stream = this.getClass().getClassLoader().getResourceAsStream(file);

```
