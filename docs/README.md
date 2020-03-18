#### 环境与知识准备

1.  下载安装 [Taro cli](http://taro-docs.jd.com/taro/docs/GETTING-STARTED.html)

```bash
# 安装taro，首页你得有一个合适的nodejs环境，然后通过yarn安装taro-cli，或者使用npm：npm install -g @tarojs/cli 
$ yarn global add @tarojs/cli
```

2.  下载 nice-router-taro

```bash
git clone https://github.com/kala888/nice-router-taro
```

3.  编译，启动开发环境

```shell
#下载相关的依赖,推荐yarn，当然也可以用npm install
$yarn
#启动小程序 推荐yarn，当然也可以用npm run dev:weapp
$yarn dev:weapp
```

4.  [微信开发者工具中](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)，导入项目
    查看效果

> **小提示:**
> 
> 1.  nice-router-taro已集成prettier，代码提交到git前，先 'yarn format' 一道，有助于团队成员间代码merge.
>     
> 2.  文档中提到的“服务端”是指供前端开发使用**Façade**层，根据项目架构不同可能指代的是后台或者中台应用。（Façade 读音： 法萨）
> 
> 4.  如果需要提交发布，你需要成为开发者（找到您的小程序应用的管理员，把你的微信添加到开发者列表里就行）
>     
> 5.  如何修改小程序AppId (project.config.json)
>     
> 
> ```javascript
>  "appid": "wxff........07"
> ```
> 
> 5.  如何修改 默认title和theme (**可选**)
>     修改主色：通过 [Taro UI](https://nervjs.github.io/taro-ui-theme-preview/) 填入主色后，下载并打开文件
>     修改./src/styles.theme.scss中的三个值就行了
>     
> 
> ```css
> $color-brand: #6dbb4d;  $color-brand-light: #92cc7a; $color-brand-dark: #57963e;
> ```
> 
> 修改navigationBarBackgroundColor和tabBar的颜色（app.js中）
> 6.  如何修改后端服务地址 (**可选**) ./src/utils/config.js

> ```javascript
> const baseURL = 'https://demo2.doublechaintech.com/storedev/wxappService/'
> ```


#####

*老铁，都看到这了，点个赞呗*

#### 我需要一个后端服务，最好搭配一个中台

-   这里强力安利一款牛逼的低码平台，通过使用自动代码生成技术，告别996。
[DaaS Start Kit](https://github.com/doublechaintech/daas-start-kit)，可以与nice-router完美配合。


### 开发手册

[新增简单页面](/docs/hello-daas-page.md)

[让页面与后端进行数据交互](/docs/fetch-data-for-first-page.md)

[来几个概念和约定](/docs/concept.md)

[简单使用listof组件](/docs/use-listof.md)

[如何创建新的line-item](/docs/how-to-create-new-line-item.md)

[图片上传](/docs/file-upload-service.md)

[提交一个Form](/docs/submit-form.md)

[Step-Form]

[ServerImage](/docs/server-image.md)

[使用后端驱动Toast消息](/docs/taost-from-backend.md)

[使用后端驱动的Popup消息](/docs/popup-from-backend.md)

[使用后端驱动的登录跳转](/docs/listof-page.md)

[NavigationService](/docs/navigation-service.md)

[view-mapping](/docs/view-mapping.md)

[nice-router.model](/docs/nice-router.model.md)

### 几个内置页面

[混搭H5页面](/docs/h5-page.md)

[断网重试network-exception-page](/docs/network-exception-page.md)

[使用HomePage](/docs/home-page.md)

[使用LoginPage](/docs/login-page.md)

[使用Listofpage](/docs/listof-page.md)

[使用GenericPage](/docs/generic-page.md)

[内置的Genericpage UI Element](/docs/generic-page-ele.md)

内置的Listof lineitem

##### ......

##### 100. [Tips](/docs/tips.md)
