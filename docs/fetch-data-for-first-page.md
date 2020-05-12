### 让页面与后端进行数据交互

在`hello-daas-page`的基础上增加两个功能，页面加载后获取服务器数据，点击button跳转到me页面。

1. IDE中修改`hello-daas-page.jsx`
   
   ```javascript
   import React from 'react'
   import { Button, View } from '@tarojs/components'
   import NavigationService from '@/nice-router/navigation.service'
   import Config from '@/utils/config'
   
   export default class HelloDaasPage extends React.PureComponent {
   
     state = {
       pageTitle: '等着。。。还在请求',
     }
   
     componentDidMount() {
       NavigationService.ajax(Config.api.FooterHome, {}, {
         onSuccess: (resp) => {
           console.log('fetch data from backend,resp data:', resp)
           this.setState({
             pageTitle: resp.pageTitle,
           })
         },
       })
     }
   
     handleClick = () => {
       NavigationService.view(Config.api.FooterMe)
     }
   
     render() {
       const { pageTitle } = this.state
       return (
         <View>
           <View style={{ color: 'green', padding: '20px' }}>
             Page Title {pageTitle}
           </View>
           <Button type='primary' onClick={this.handleClick}>        go to Me page
           </Button>
         </View>
       )
     }
   }
   ```

2. 代码保存后刷新页面

页面会先展示

![1](/docs/assets/first-page-onload.jpg)

代码获取数据后

![2](/docs/assets/first-page-after-load.jpg)

点击"go to Me Page" 按钮，页面会跳转到Me页面

Tips：

> 1. `NavigationService` 工具类，方法ajax，简单粗暴的发送`ajax`请求，接受三个参数（uri，params，options）
> 
> 2. `options.onSuccess`就是获取获取数据后的回调，这里可以回填state数据
> 
> 3. handleClick中`NavigationService.view `方法也很直接，可以直接理解为，我要看一个页面(具体的跳转逻辑参看NavigationService)
