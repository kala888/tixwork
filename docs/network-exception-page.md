### 网络异常页面

   目前默认的断网处理方式，是捕获异常，跳转network-exception-page.js 

在这个页面上有个重试按钮（重放上个action）

##### 如何覆写这个页面？

在viewmapping.config下配置新的页面就行了

```javascript
  'com.terapico.caf.local.NetworkException': {
    pageName: '/your-new-pate-path',
  },
```

> 1，注释掉pageName, 将不再页面跳转
> 
> 2，添加stateAction和effecAction可以触发model中的方法

#### 相关的代码文件

network-exception-page.jsx, nice-router.js, viewmapping.config.js, http-request.js
