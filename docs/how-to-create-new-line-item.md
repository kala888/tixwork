### 如何创建新的line-item

line-item是为了配合listof和ListofPage做展示用的，这里以增加一个只有一行文字的line-item为例

1. 在./src/listof/templates/biz下新增文件just-a-line-template.js
   
   ```javascript
   import React from 'react'
   import { formatMoney } from '@/utils/index'
   import { View } from '@tarojs/components'
   
   export default class JustALineTemplate extends React.PureComponent {
     render() {
       const { item = {} } = this.props
       const {
         title, amount = 0,
       } = item
       return (
         <View className='justALine'>
           <View>{title}</View>
           <View>{formatMoney(amount)}</View>
         </View>
       )
     }
   }
   ```

2. 将line-item注册到./src/listof/templates/flex-line-item.jsx

```javascript
import JustALine from './biz/just-a-line-template'
     ......
  render() {
    ......
     { template === 'just-a-line' && <JustALine {...itemProps} /> }
    ......
  }

```

3. 这样在任意listof或者ListofPage就可以使用displayMode="just-a-line"

希望大家能够贡献常用且漂亮的LineItem到代码库，以后list页面就完全由服务端驱动了。
