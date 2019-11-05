nice-router目标是统一多端的开发体验，具体就是说无论前端是React，Taro，RN，还是Flutter，写代码的思路是一致的。同时满足前端页面驱动和后端路由驱动的需求，给予后端开发页面控制权（方便实现客CS程序的千人千面，业务变更）。

目前实现有 nice-router-taro 和 nice-router-react-native

 nice-router  提供基础的，请求，路由，数据处理，异常处理等功能，同时额外支持listof和genericpage。

- [nice-router.model](https://github.com/kala888/nice-router/blob/master/navigation-service.md)
  
  基于dva的核心路由组件。封装了https请求前后的一些常见行为方法。

- [NavigationService](https://github.com/kala888/nice-router/blob/master/navigation-service.md) 
  
  工具类。通过基础配置后，随时随地无脑享用页面跳转和请求服务端数据。

- [Listofpage](https://github.com/kala888/nice-router/blob/master/navigation-service.md)
  
  一个通用的list页面，可以用来展示各种list。

- [GenericPage](https://github.com/kala888/nice-router/blob/master/navigation-service.md)
  
  一个基于数据驱动的动态页面，根据服务端返回的数据，来render不同的页面

还有一些约定俗成的名称：

imageUrl，对于单个对象，可能有一个对应的图片，例如user上的imageUrl，在语义上多指头像，

linkToUrl，和imageUrl类似，多数情况下是指该对象的资源地址

action, 多数是指类action对象，详情参考NavigationService中的action
