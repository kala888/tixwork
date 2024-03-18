#代码生成部分, 不要改动和编辑
#代码生成部分, 不要改动和编辑
#代码生成部分, 不要改动和编辑

### 1. Controller 如何覆盖

Controller 生成的时候，会添加ConditionalOnMissingBean。同时也可以在生成时设置disableController来禁用生成类。

例如：
```java
// 自动生成代码
@RestController
@RequestMapping("/hello")
@ConditionalOnMissingBean(name = "TestController")
public class TestController {
    @GetMapping("/hello")
    public String hello() {
        return "hello";
    }
}
```

通过新增CustomizedTestController。可以实现复写"/hello"和新增"/hello2"

```java
@RestController("TestController")
public class CustomizedTestController extends TestController {
    @Override
    public WebResult hello() {
        return "customized hello";
    }
    @GetMapping("/hello2")
    public WebResult hello2() {
        return "hello";
    }
}
```

tips: 
    
   1. 无需@Primary
   2. 如果自定义的类想要实现类似方案，记得把权限控制拷到子类中，例如@SaIgnore
   3. 子类可以复写类上的uri：例如  @RequestMapping("/hello") 修改为 @RequestMapping("/hello-test") 
   4. 子类中方法覆盖时，可以复写uri：例如 @GetMapping("/hello") 修改为 @PostMapping("/hello")
    

### 2. Service 如何覆盖

Service 生成的时候只是普通的Bean。通过在子类中添加@Primary来覆盖bean。同时也可以在生成时设置disableService来禁用生成类。

例如：
```java
// 自动生成代码
@Service
public class HelloService {

    public void hello() {
        Console.log("say hello");
    }
}
```

通过新增CustomizedHelloService。可以实现复写"hello"

```java
@Service
@Primary
public class CustomizedHelloService extends HelloService {

    @Override
    public void hello() {
        Console.log("say hello in Customized HelloService");
    }
}
```