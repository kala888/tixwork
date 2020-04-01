# 后端驱动的login

再多的前端权限控制其实都是徒劳的，所以nice-router干脆就没有设计太多的前端权限控制。复杂场景下，权限应该是动态的，数据级别的，一个用户对于一个对象是否有权限，对于对象上的数据是否有相关权限，都可以随着其他关联数据的变化而变化。

登录状态也是一样的。前端开发可以在不需要知道哪些页面是要求用户必须需要登录的，情况下做开发，反正服务端同学必须要校验，那省事了，在前端发起一个请求后，服务端通过复杂（有可能极为复杂）的判断，发现需要登录，那么直接返回一个前端跳转登录页面的response就行了

header中指定x-class

```java
x-class= com.terapico.appview.LoginForm
```

#### 类似”点赞“这种Ajax如何处理呢？

两种方法：

- 法1（强烈建议）: 服务端返回header中直接添加` x-redirect=true`. 
  
  你放心，后端肯定知道当前的请求是否是要求的。

- 法2. 前端直接通过onSuccess来自己判断，也可以修改router.model.js(谨慎操作) 

##### 如何复写这个页面？

在viewmapping.config下配置新的页面就行了

```javascript
  'com.terapico.appview.LoginForm': {    
      pageName: '/your-new-pate-path',  
  },
```

> 1，OOTB的login页面中包含微信login和微信企业login的处理方法





#### 相关的代码文件

login-page.jsx
