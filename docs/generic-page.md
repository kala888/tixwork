### 使用GenericPage

GenericPage的设计原理很简单，通过解析服务端返回的数据结合if-else来渲染不同组件。

核心代码如下：

```javascript
<Block key={it.id}>
              {/* ui elements*/}
              {it.type === 'text' && <EleText {...ele} />}
              {it.type === 'image' && <EleImage {...ele} />}
              {it.type === 'button' && <EleButton {...ele} />}
              {it.type === 'carousel' && <EleCarousel {...ele} />}
            。。。。。。
              {it.type === 'more-actions' && <EleMoreActions {...ele} />}</Block>
```

服务端返回x-class=com.terapico.caf.viewcomponent.GenericPage

nice-router 会路由到GenericPage页面渲染数据。

又来一个栗子（数据：mock-genericpage.data.js）

![](/docs/assets/generic-page.gif)

结合Daas系统生成的前端，可以由运营同学拖拽完成。（**拖拽部分正在研发，有兴趣的同学要添砖加瓦**）

###### 如何构造数据

查询文档或者代码，确定目前支持的组件

./src/genericpage/container/ele-flex.jsx

组件目前分为4大部分

- 1.普通展示型(image,button,carousel等)

- 2.项目自定义（在biz目录，项目相关）

- 3.form相关(常用的如radio，input等)

- 4.容器型（type='form'   type='flex'）

GenericPage需要服务端返回的数据结构

```javascript
  const pageData = {
  pageTitle: 'Nice router 社区',
  pageLinkToUrl:'/marketing/code-by-laowang'
  kids: [
    { id: '0', type: 'carousel', ...carousel },
    ...........所有你想要的组件，如果没有，写就是啦
    { id: '15.1', type: 'white-space' },
    { id: '16', type: 'footer-tabs', ...footer },
  ],
}
```

> 1. pageTitle： 当前页面所展示到titlebar的文字
> 
> 2. pageLinkToUrl： genericpage被分享后，其他用户点击分享，genericpage会根据该URL来获取相关服务端数据
> 
> 3. kids: 该页面从上到下的所有children，每一个child都可以有自己的kids, 依赖于组件的实现。这里只写的页面级别的children，不建议建组件分的太底层，不然性能搞不定的。（由于taro处理children这个关键的问题，所有用kids来代替）

组件中的一些约定：

- 1. className 样式名称（自定义和内置的OOTB）

- 2. customStyle css属性就是组件内部根节点的style（由于style会被组件占用，传不到组件内部，所有这里用了一个customStyle代替）

- 3. type，每个组件都应在ele-flex找到对应的组件

- 4. id，由于用的是循环，id是不可少的

- 5. 每个组件的实现都略微不同，详细的属性需要参考代码

目前nice-router-taro内置了两个generic-page实例，如果您的项目在这方面需求量大（可多页面都是数据驱动出来的），可以增加generic-page.js的数量，通过冗余设计达避免多个generic-page之间数据切换的问题

话外提：其实针对一些项目，整个小程序可以完全由genericpage组成，不需要前端程序员做啥页面，完全由服务端数据驱动。甚至可以轻松的实现，不需要小程序审核的情况下，上午菠菜，下午聊天，晚上视频，想想力空间很大。

基于同样的原理我们最早用mpvue实际上线了两个项目，完全由genericpage组成。由于mpvue的机制（当时报了一个bug，一直没处理掉，这也是放弃mpvue的一个原因 [https://github.com/Meituan-Dianping/mpvue/issues/907](https://github.com/Meituan-Dianping/mpvue/issues/907)），第一个项目性能稍差，有些页面太深还会导致小程序崩溃，第二个项目修改了mpvue的部分实现，效果还可以。目前taro实测下来，性能杠杠的。
