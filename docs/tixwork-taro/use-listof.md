### 简单实用listof组件

在hello-daas-page的基础上增加展示两个list：一个水平的list，一个垂直的list

```javascript
import React from 'react'
import { View } from '@tarojs/components'
import SectionBar from '@/components/biz/section-bar'
import EleBreakLine from '@/elements/common/ele-break-line'
import Listof from '../../listof/listof'

export default class HelloDaasPage extends React.PureComponent {

  render() {
    return (
      <View>
        <View style={{ color: 'green', padding: '20px' }}>
          测试Listof
        </View>

        <EleBreakLine
          color='#e4b479'
          fontColor='#e4b479'
          text='最热文章'
          customStyle={{ margin: '40px 0', padding: '0 100px' }}
        />
        <Listof list={articleList} />

        <SectionBar title='推荐店铺' brief='Top Store' customStyle={{ paddingLeft: '20px' }} />
        <Listof list={shopList} displayMode='auto' />

      </View>
    )
  }
}


const testImageUrl1 = 'https://m.360buyimg.com/babel/s370x259_jfs/t1/20729/24/4177/80676/5c2f1aeaE062589aa/ee7cc78db75d62ed.jpg!q70.dpg'
const testImageUrl2 = 'http://www.eastphoto.cn/indexImages/ep-012136603.jpg'

const shopList = [
  {
    id: 'shop1',
    title: '百安居天府新区店',
    brief: '【装修旗舰店】免费测量，预定送智能家居',
    imageUrl: testImageUrl1,
  },
  {
    id: 'shop2',
    title: '湛蓝科技',
    brief: '【空气治理专家】持牌机构，空气治理去甲醛',
    displayMode: 'image-on-left',
    imageUrl: testImageUrl2,
  },
  {
    id: 'shop3',
    title: '小金狗回收',
    brief: '高科技环保企业，可再生资源再利用',
    displayMode: 'image-on-bottom',
    imageUrl: testImageUrl1,
  },
]

const articleList = [
  {
    id: 'article1',
    title: '装修如何高质量又省钱',
    imageList: [
      { id: 1, imageUrl: testImageUrl1 },
    ],
  },
  {
    id: 'article2',
    title: '挑选电器有技巧',
    imageList: [
      { id: 1, imageUrl: testImageUrl2 },
      { id: 3, imageUrl: testImageUrl1 },
    ],
  },
  {
    id: 'article3',
    title: '水电改造攻略',
    brief: '水电改造是坑货么？会不会被装修公司坑？难道没有合理的高质量水电改造？让我们一起来给大家分析一下',
    imageList: [
      { id: 1, imageUrl: testImageUrl2 },
      { id: 2, imageUrl: testImageUrl1 },
      { id: 3, imageUrl: testImageUrl2 },
    ],
  },
  {
    id: 'article4',
    title: '吊顶么？',
    displayMode:'single-image',
    imageList: [
      { id: 1, imageUrl: testImageUrl1 },
      { id: 2, imageUrl: testImageUrl1 },
      { id: 3, imageUrl: testImageUrl1 },
    ],
  },
]
```

> 1. listof组件是对常用list行为的封装，可以提供分页功能
> 
> 2. 在listof组件级别和item级别都可以置顶displayMode
> 
> 3. listof组件会根据displayMode来找到相应的listof line-item组件进行展示

大部分list或者list页面，前台开发人员只需要写/抄/共享/使用 那个局部的listof-line就够了。只要数据满足相应的line-item 要求，服务端（中台）开发人员可以通过数据驱动来变换前台展示。

更多功能参考listof-page（一个通用的list也面）
