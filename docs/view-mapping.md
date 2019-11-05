### ViewMapping

前端页面与服务端response的关系映射文件。

先看一个栗子：点击“查看”这个button的时候，NavigationService.view到后端服务。后端服务发现，该action需要登录权限，那么返回的respose中包含x-class=com.terapico.appview.MePage，引导用户重新登录。

```javascript

  'com.terapico.appview.MePage': {
      pageName: '/pages/me/me-page',   
       stateAction: 'me/save',  
  },
```

> 当x-class='com.terapico.appview.MePage' 的时候，nice-router.model 会查阅该配置信息，前端路由到/pages/me/me-page，并执行model中的save这个reducer。

根据上面的例子，可以看出viewmapping就是后端控制前端路由的核心配置

不同的class可以出发或跳转不同的页面。（不要纠结class是啥，就是个字符串，一个key而已）

每个配置项都是是Key-Value结构

###### Key

后端返回的class名称，一个字符串，例如 "com.terapico.doublechain.appview.HomePage"

###### Value

可能是一个或者一组数据，每个配置包含四个可选键值

- pageName: 前端的页面path，会用来做navigate。

- stateAction: model中的reducer的名字（也可能是一组，参考listof的stateAction）

- effectAction: model中的effect的名字（也可能是一组，参考listof的stateAction）

- message: 服务端错误，可以配置本地的error错误信息，
  
  一个class多个页面instance轮流展示：

```javascript
  'com.terapico.caf.viewcomponent.GenericPage': [
    {
      pageName: '/genericpage/generic-page',
      stateAction: 'genericpage/save',
    },
    {
      pageName: '/genericpage/generic-page2',
      stateAction: 'genericpage2/save',
    },
  ],
```

更复杂一点: listof 页面单独轮询处理，每次执行展示后，清掉下一个页面的数据

```javascript
 'com.terapico.appview.ListOfPage': [
    {
      pageName: '/listof/listof-page',
      stateAction: ['listofpage/save', 'listofpage2/clear'],
    },
    {
      pageName: '/listof/listof-page2',
      stateAction: ['listofpage2/save', 'listofpage3/clear'],
    },
    {
      pageName: '/listof/listof-page3',
      stateAction: ['listofpage3/save', 'listofpage4/clear'],
    },
    {
      pageName: '/listof/listof-page4',
      stateAction: ['listofpage4/save', 'listofpage/clear'],
    },
  ],
```

 这里虽然服务端每次都返回ListOfPage的class, 前端路由会轮流切换page的instance
