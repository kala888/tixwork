### NavigationService

  NavigationService 被设计为一个全局的静态的工具类。目标就是随时随地+无脑享用页面跳转和服务端请求。

  NavigationService 支持，navigate(前端页面跳转), ajax, post, post form, put, H5 Webview跳转，后端路由前端缓存。

#### 概念和对象

##### 1. 页面跳转

###### 1.1 前端页面跳转(navigate)

SPA开发中点击一个button后，前端先路由到这个页面，然后通过在componentDidMount发送ajax请求来改变当前页面的state。

在Nice-router中怎么写呢？

```javascript
<Button onClick = {()=>NavigationService.navigate("/pages/me-page")}>
    查看我的
</Button>
```

目标页面

```javascript
// /pages/me-page.jsx

componentDidMount(){
    NavigationService.ajax("/fetch-my-account-info", {},{
    onSuccess:(resp)=>{
            this.setState({meInfo:resp})
        }
    })

}
```

###### 1.2  Ajax

通过上面的例子，我们可以看到，ajax的目标就是满足前端程序员发送一个ajax的愿望。

options中`onSuccess`就是请求成功后的回调。

###### 1.3 Post ，Put

NavigationService.post, NavigationService.put向服务端发post或者put数据

###### 1.4 Post Form

这个有点特殊。对于java来说，前端post的一个复杂的JSON数据的时候，后端服务解析起来相当不舒服，那简单点，前端直接把JSON数据转换成一个字符串Post给后端服务得了。

 后端程序直接获取参数`formData`='{...这里是特别复杂对象的字符串}'，然后再解析这个JSON就够了。

```javascript
  handleSubmit=()=>{
    const params={......弄一个特别复杂的对象 ....}
    // NavigationService.post('/send-complex-data',params) //普通post，后端需要挨个解析form，java程序员比较痛苦
    NavigationService.post('/send-complex-data',params,{asForm:true})
  }
```

###### 1.5 H5页面跳转

 如果路由的路径(Action)满足如下要求（详情）

```javascript
const isH5Path = (uri) => startsWith(uri, 'https://') || startsWith(uri, 'http://')
```

使用

```javascript
NavigationService.view("https://www.baidu.com/")
NavigationService.view(action) //action={linkToUrl:'http://www.b.com'}
```

###### 1.6 后端路由前端缓存

  这个不太好解释，放到最后

##### 2. linkToUrl

  linkToUrl这个是在nice-router中前后端的一个语义化属性。类型是字符串

他通常是一个url或者uri，是该对象的资源定位的语义化标识。

  如果一个页面根对象下有一个linkToUrl, 可以解析为当前一面的url，可以用来做refresh

  如果放在某个对象下，如action或者article，一般标识该action或者article被点击时候的请求连接.

举个例子：一个文章列表

```javascript

   // articleList=[{id:111,title:'测试文章',linkToUrl:'/view/article/111'}]
    {
     articleList.map(article=>{
        const { linkToUrl }=article
        return(
            <View key={article.id} 
                  onClick={()=>NavigationService.view(linkToUrl)}>
                <Text>{article.title}</Text>
            </View>
        )
     })
    }
```

 支持的协议

| 协议      | 样例                          | 解释                                         |
| ------- | --------------------------- | ------------------------------------------ |
| http(s) | https://www.baidu.com       | Webview页面跳转                                |
| page    | page://pages/home/home-page | 静态页面跳转到 /pages/home/home-page              |
| 默认      | /viewHomePage/              | 发送服务端请求到/viewHomePage/，根据后端的返回的class，做页面跳转 |

##### 3. Action

很多时候终端用户都在点击一个东西。目的都很单纯，要与后端发生一个交互（暂定简单交互吧），根据交互结果做展示或者页面跳转。

> 也许是一个button, 一个 list中的line-item, 一个签到的link，也可能是Carousel上的一个图片，或者是某个category的小图标。

nice-router 支持服务端数据据驱动页面展示。将这个与后端交互的诉求抽象为一个action。

  举个栗子：一个标准的action

```javascript
{
    code: 'submit'
    title: '提交',
    linkToUrl: '/xxxxx'
    extraData: {}
}
```

一个action或者类action对象，配合NavigationService用起来很方便

再举个栗子：

```javascript
    // 一个点赞功能
    handleLike = () => {
        const { actions = {} } = this.props
        const { like } = actions
        
        this.setState(
        
          pre => ({
            likeCount: like.code === 'like' ? pre.likeCount + 1 : pre.likeCount - 1,
          }),
          
          () => {
              NavigationService.ajax(like, {}, {
              onSuccess: (resp) => {
                this.setState({ likeCount: resp.likeCount })
              },
          })
      })
  }

   // 查看detail
   handleViewDetail=()=>{
    const {actions={}}=this.props
    NavigationService.ajax(actions.viewDetail)    
   }

   // 表单提交
   handleSubmit=()=>{
    const paramas={......}// 获取表单数据
    const {actions={}}=this.props
    NavigationService.post(actions.submit,params)
   }


   ...


   <Button onClick={this.handleSubmit}>{actions.submit.title}</Button>
```

这里服务端返回的数据中有一个actions={}的对象，里面包含了submit，viewDetai和like的Action

```javascript
{
    viewDetail:{
        ......
        linkToUrl:'/m/viewdetail/'
    },
    submit:{
        title:'报名'
        linkToUrl:'/m/registry/'
    },
    like:{
        title:'已关注'
        linkToUrl:'/m/unlike'
    }
}
```

> 文档中提到Action地方大多支持类Action，类Action对象采用[duck typing]([https://zh.wikipedia.org/wiki/%E9%B8%AD%E5%AD%90%E7%B1%BB%E5%9E%8B](https://zh.wikipedia.org/wiki/%E9%B8%AD%E5%AD%90%E7%B1%BB%E5%9E%8B))
> 
> ```javascript
> const getActionUri = (action) => {
>   let result = action
>   if (isObject(action)) {
>     const { linkToUrl, uri } = action
>     result = linkToUrl || uri
>   }
>   return result || ''
> }
> ```

##### 4. actions

  一组有名的action集合，一般用来供前台用户自由处理, 可以用code作为key值

```javascript
{
    actions:{
       viewDetail:{
         code:'viewDetail'
         ......
         linkToUrl:'/m/viewdetail/'
       },
       submit:{
         code:'submit'
         ......
         title:'报名'
         linkToUrl:'/m/registry/'
       },
       like:{
         code:'like'
         ......
         title:'已关注'
         linkToUrl:'/m/unlike'
       }
    }
}
```

##### 5. actionList

  一组action的list集合，一般用来提供list的列表，例如可以在右上角的"..."，或者底部堆叠的button或者使用ActionSheet

  多个地方要展示actionLis页面，特殊位置需要在actionList基础上添加前缀，例如moreActionList, leftTopActionList。

```javascript
  {
 actionlist: [
    { code: 'viewTerms', title: '查看用户协议', linkToUrl: 'https://www.xxx.com/user-terms' },
    { code: 'return', title: '取消', linkToUrl: '/cancel/order/111' },
    { code: 'checkout', title: '去买单', linkToUrl: 'page://pages/checkout-page' },
  ]
  }

  ...

  {
    actionList.map(action=>(
        <Button onClick={()=>NavigationService.view(action)}>
            {action.title}
        </Button>
    ))
  }
```

> actions, actionList和XXXActionList都是一些命名规则方式，不强求

### 常用接口

| 接口                                                | 样例  | 解释                                                           |
| ------------------------------------------------- | --- | ------------------------------------------------------------ |
| NavigationService.ajax(action,params,options)     | --- | 发送一个ajax                                                     |
| NavigationService.view(action,params,options)     | --- | 查看一个页面，多数情况下会有页面跳转                                           |
| NavigationService.put(action,params,options)      | --- | put方式发送数据                                                    |
| NavigationService.post(action,params,options)     | --- | post方式发送数据                                                   |
| NavigationService.navigate(action,params,options) | --- | 页面跳转                                                         |
| NavigationService.routeTo(action)                 | --- | 非常common的一个route函数，可以对route行为细粒度控制，ajax,view,post都是route的语法糖 |
| NavigationService.back()                          | --- | 后退                                                           |

 参数action, 可以是action或者类action对象，也可以是linkToUrl(字符串)

 参数params, 用于get/post/put/navigate 的参数

 参数options，可选值列表

- options.loading, 默认值`LoadingType.none`, 常用值，LoadingType.barLoading 在titleBar显示菊花,LoadingType.modal 全局的菊花

- options.method, 默认值'get'，常用值，'post', 'put'

- options.statInPage, 默认值false，设置为true的时候页面不进行跳转，类似ajax

- options.cache, 默认值为false，是否做页面缓存

- options.asForm，将params序列化成一个字符串，post到服务端，同时转全局菊花，服务端通过formData这个字段获取整个json对象

- options.onSuccess, 请求成功时候的回调函数

举一袋子栗子：

1. 如何发送Ajax请求，并获取response
   直接调用

```javascript
    NavigationService.ajax(
        "/viewHomePage/:userId/",
        { userId : 'AU123456'  },
        {
          onSuccess:(resp)=> this.setState({root:resp})
        }
    )
```

2. 如何post 数据

```javascript
    NavigationService.post(
        "/viewHomePage/:userId/",
        { 
          userId : 'AU123456',
          passwork:'xxxxx'
        }
    )
```

3. 如何使用H5跳转

```javascript
   NavigationService.view("https://www.baidu.com")
```

4. 如何静态页面跳转(注意这里的action可以是由服务端提供的数据，这样服务端也可以控制这个action做静态页面跳转了)

```javascript
  NavigationService.navigate("/pages/home-page")
  或者
  const action={...,linkToUrl:'page://pages/home-page'} //来自服务端数据驱动
  NavigationService.view(action)
```
