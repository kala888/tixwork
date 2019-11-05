### 使用ListofPage

 各种list页面在移动端非常常见，而且很多页面的代码相似度极高，只是中间的line-item展示方式不同而已。并且大量的页面就是一个tab和一堆line-item组成，
 开发人员需要单独处理下拉刷新，上拉加载更多，没有数据的时候展示empty message。基于这些套路，nice-router内置了ListofPage和listof组件（冗余设计+数据驱动）

#### 概念和对象

 这里抽象了两个组件出来

  Listof 和 ListofPage

1. Listof 组件
   
   通常用来展示一个有限集的列表（不用下拉刷新）
   
   例如某个页面，有三个list组成，先是展示10 文章，然后是展示20商品，最后还要展示10个推荐作品
   
   大体结构应该是类似如下代码:
   
   ```javascript
   render(){
       return(
            <View>
                <Carousel ..../>
                <PromotionBanner ...>
                
                <SectionBar title="精品文章"/>
                <Listof list={articleList} displayMode='article'/>
                
                <SectionBar title="热卖"/>
                <Listof list={productList} displayMode='product'/>
                
                <SectionBar title="推荐作品"/>
                <Listof list={artworkList} displayMode='artwork'/>
            </View>
       )
   }
   ```
   
   Listof组件的目标就是，通过在父组件（可能是页面）提供数据(list)和模板名称(displayMode)对这组数据进行渲染，同时不同的line-item 模板还可以在不同数据对象间复用（前提是数据规格一致）
   
   > line-item 可以单独指定渲染的模板

2. ListofPage 页面
   
   nice-router 内置了几个（目前是4个）listof-page实例，用来展示标准的list页面。
   
   ListofPage包含一个tabs（可选）和一个无线集的list（能够下拉刷新，上拉加载更多）并且当没有数据的时候展示Empty Message。
   
   举个栗子：首页的carousel有个图片是双11促销，点击以后跳转到一个促销商品列表。
- 点击图片-> NavigationService.view('....')发送后台请求。

- 后台response返回listof的数据，且header中需要包含x-class = "com.terapico.appview.ListOfPage"。

- nice-router则会自动跳转到ListofPage.

response:

```javascript
{
  pageTile:'618-品牌大促销',

  tabs:[
    { code: 'hot', linkToUrl:'/m/hot',title:'抢购',selected:true},
    { code: 'cool', linkToUrl:'/m/cool',title:'冰箱大促'},
    { code: 'others', linkToUrl:'/m/others',title:'其他抢购'},
  ],

  dataContainer:{
      p1:{
          id:'p1',
          displayMode:'lainongwo-template1',
          title:'联想箱',
          imageUrl:'product/a.jpg',
          linkToUrl:'product/p1'
      },
      ......
      p15:{
          id:'p15',
          title:'西门子垃圾桶',
          imageUrl:'product/k.jpg',
          linkToUrl:'product/others/p15'
     },
  },

  list:[{id:'p1'},{id:'p15'}......,{id:'p12'}],

  listMeta:{
    hasNextPage:true,
    linkToUrl:'/marketing/618/page/2'
  },

  displayMode:'auto',

  emptyMessage:'没货了，快点联系厂家来补货'

}
```

  这样的数据就会渲染出，有3个tab, 无限下拉分页，每个line-item可以指定展示的template的标准页面，后台开发可以任意的返回不同数据，甚至做到千人千面。

终端用户点击每个line-item的时候会触发标准的页面跳转（click方法可以重写，实现自己的逻辑，例如list页面中就可以点赞）

pageTile：显示在title-bar上的文字

tabs：可选，tab中的属性，code唯一的id，linkToUrl点击后发送的请求。

list：该页面要展示的list的所有数据的id

dataContainer：类似于当前页面的一个数据库和list配合使用

listMeta:当前页面的meta信息，包含了是否有下一页和下一页的url

emptyMessage：当返回的数据中list为空的时候，会展示给用户的消息。

displayMode：line-item默认使用的模板（所有模板都应注册到line-item-wrapper.js）

> 这里要解释一下，list, dataContainer和listMeta。
> 
> list里包含了要展示的数据（id），nice-router会根据id从dataContainer里将数据组装成一个完成整的list。
> 
> 当listofpage页面中的line-item组件发送ajax请求，例如点赞，服务端需要返回dataContainer数据，里面只需要包含变化了的那个list-item数据就行了，从而达到了统一的局部刷新。
> 
> 每次加载更多的时候， 服务端需要返回新一页的数据，list和dataContainer会自动合并，并更新listMeta。

如何新增一个line-item





目前nice-router-taro内置了4个listof-page实例，如果您的项目在这方面需求量大，可以增加listof-page.js的数量，通过冗余设计达避免多个listof-page之间数据切换的问题.




