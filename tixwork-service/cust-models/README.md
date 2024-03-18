### 如何覆写？

大体有两种方法，1.通过继承。2.通过Bean替换。3.通过不在生成文件。
其中分部分，domain, controller, service, mapper, mapper-xml, sql

#### 1. Domain 如何覆写

#### 2. Controller 如何覆写

#### 3. Service 如何覆写

#### 4. mapper(java) 如何覆写

#### 5. mapper(xml) 如何覆写

#### 6. sql 如何覆写

#### 7. UI  如何覆

Controller 生成的时候，会添加ConditionalOnMissingBean。 例：

```java
// 自动生成代码
@ConditionalOnMissingBean(name = "TestController")
public class TestController extends BaseController {
    @GetMapping("/hello")
    public WebResult hello() {
        return null;
    }
}
```

添加组定义类, 复写"/hello"和新增"/hello2"

```java
@RestController(name = "TestController")
public class TestController extends BaseController {
    @Override
    public WebResult hello() {
        return "hello";
    }
    @GetMapping("/hello2")
    public WebResult hello2() {
        return "hello";
    }
}
```
