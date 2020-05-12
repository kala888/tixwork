### 新增简单页面

在IDE中打开项目

> 开发环境建议使用webstorm或者Idea，简单省事，不需要折腾那些有的没的插件.

1. hello-daas-page.jsx
   
   在./src/pages/biz目录下新建文件hello-daas-page.js文件
   
   ```javascript
   import React from 'react'
   import { Button, View } from '@tarojs/components'
   
   export default class HelloDaasPage extends React.PureComponent {
     handleClick = () => {
       Taro.showToast({ title: 'Hello....' })
     }
   
     render() {
       return (
         <View>
           <View style={{ color: 'green', padding: '20px' }}>
             Hello DaaS, from
           </View>
           <Button type='primary' onClick={this.handleClick}>
             nice-router-taro
           </Button>
         </View>
       )
     }
   }
   ```

> 1.biz文件夹是为了把项目代码和框架代码进行隔离，便于项目间代码复用和系统升级
> 
> 2.建议的页面文件命名规则是 xxx-page.js，这样友好IDE，便于搜索文件的时候，一眼就看出来文件长得很像的文件是干啥用的，例如项目中可能有home-page.js, home.model.js, home.service.js, home.style.css等，通过IDE搜索home的时候就能很清晰的找到你要访问的文件了。（由于taro的文件名中间不允许用“.”，所以用“-”代替了）

2. 将hello-daas-page注册到app.js
   
   ```
    config = {
       pages: [
         'pages/biz/hello-daas-page',
         'pages/home/home-page',
          ......
       ],
       ......
     }
   ```
   
   > 1.小程序中新增的页面都必须到./src/app.js中报道，怎么无法识别.
   > 
   > 2.这里把页面增加到了第一行，意思就是，小程序启动时候的个页面
   > 
   > 3.注意页面地址就是page文件的路径，以pages开头没有/, 不应该带文件后缀
   > 
   > 4.理论上你修改了代码，Taro就会重新编译，模拟器就能展示你最新的代码，但是。。。可能会失败，重启一下就ok了 yarn dev:weapp
