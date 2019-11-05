# HomePage

   服务端返回x-class=com.terapico.appview.HomePage
   router 会默认跳转home页面

#### 设计目标

    路由到home-page.js，同时支持有些客户想要的welcome page。

#### 如何使用 welcome

 home请求返回的数据，包含一个特殊的对象

```
    {
        ....
        welcomeSlides:{
            slideList:[{
                id:'111',
                imageUrl:'https://.......'
            }],
            version: 12
        }
        ....
    }
```

小程序部分会比较local本地version信息来决定，是否向C端展示Welcome

#### 相关的代码文件

home-page.js, home.model.js, welcome-carousel.js, viewmapping.config.js
