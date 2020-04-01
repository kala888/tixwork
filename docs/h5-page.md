### H5页面（webview）

   在移动端CS结构的项目（小程序，app这种需要审核的），更新客户端代码是个很痛苦的是。有些简单功能还不如写个H5。特别是一些有排班要求的文章。

H5Page就是在C端展示调用webview展示HTML页面

> 提醒，h5页面千万要简单，不然webview坑死人。具体啥叫简单，自己去测试

#### 如何使用

`NavigationService` 通过判断uri的前缀来决定是否使用H5页面

```javascript

const isH5Path = (uri) => startsWith(uri, 'https://') || startsWith(uri, 'http://')
```

所以，只需要action或者linkToUrl是网址，就行了，并且通过NavigationService进行处理的请求都会跳转到Webview

举个实际的栗子：

1. 运营同学在首页的carousel 中配置了一个通知，点击通知展示公众号上的一篇各种图文混编的文章
2. 一些Terms等条款，或者about简介，反正这些访问量很低，怎么简单怎么来的页面，在CMS系统中弄成普通H5页面，镶嵌到nice-router的项目中

#### 相关的代码文件

h5-page.jsx, navigation.service.js
