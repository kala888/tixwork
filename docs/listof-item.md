### 使用Listof Item

listof 列表中哪些一个一个的小组件

目前包含两个比较通用的模板，Auto和Card，可以通过不同配置或者数据进行变换

#### 概念和对象

| displayMode     | 说明                                                                                                        | 属性                                                                                                                                                                                                                                                             |
| --------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| auto            | 根据image的数量来自动展示未0，1，2，3图, 其中Image的数量遵循规则：如果有imageUrl，则判定为1图，否则拼接editorSuggestionImageList和imageList 这两个属性 | title，brief, displayTime,imageUrl (editorSuggestionImageList和imageList)                                                                                                                                                                                        |
| only-title      | auto模板，强制指定图片数量=0                                                                                         |                                                                                                                                                                                                                                                                |
| single-image    | auto模板，强制指定图片数量=1                                                                                         |                                                                                                                                                                                                                                                                |
| double-image    | auto模板，强制指定图片数量=2                                                                                         |                                                                                                                                                                                                                                                                |
| three-image     | auto模板，强制指定图片数量=3                                                                                         |                                                                                                                                                                                                                                                                |
| image-on-top    | 等同于auto，兼容历史                                                                                                |                                                                                                                                                                                                                                                                |
| image-on-bottom | 类似auto，强制指定图片数量=1，但是图在下面                                                                             |                                                                                                                                                                                                                                                                |
| card            | 一张图，一个title还有一个brief,如果有图，怎右边显示图，否则显示flag，level控制flag的颜色，mode控制图的大小和形状,如果有documentUrl则展示下载和查看的action                                                                                      | 可以通过mode属性的变换组成一些模板title, brief, flag = '', status, actionList , documentUrl, linkToUrl,level=[default,normal,primary,warn,danger],  mode=[horizontal\|vertical, circle, avatar,vertical-small, small\|large] |
| image-on-left   |  等同于auto，兼容历史                                                                                               |                                                                                                              |                                                                                                                                                 |
| big-card        | 大一点的card，brief能展示3行文字                                                                                     |                                                                                                                                                                                                                                                                |
| h-card          | 一行一个card，card内部水平排列，基本上和默认card一直                                                                          |                                                                                                                                                                                                                                                                |
| v-card          | 一行能排列两个，card内部垂直排列                                                                                        |                                                                                                                                                                                                                                                                |
| document        | 等同于big-card，兼容历史                                                                                               | 注意需要有一个documentUrl                                                                                                                                                                                                                                            |
| user            | h-card的一个特例                                                                                               |                                                                                                                                                                                                                                                                |
| product         | 产品                                                                                                        | preTag = '', tags = [], brand, name, price，imageUrl                                                                                                                                                                                                            |

#### 测试页面和数据

![](/docs/assets/listof-item_big-card.png)
![](/docs/assets/listof-item_h-card.png)
![](/docs/assets/listof-item_v-card.png)
![](/docs/assets/listof-card_user.png)
![](/docs/assets/listof-item_card-1.png)
![](/docs/assets/listof-item_card-2.png)
![](/docs/assets/listof-item_card-3.png)
![](/docs/assets/listof-item_product.png)
![](/docs/assets/listof-item_auto.png)

各种displayMode

```javascript
import SectionBar from '@/components/section-bar/section-bar'
import Listof from '@/listof/listof'
import MockService from '@/nice-router/request/mock-service'
import { View } from '@tarojs/components'

import './styles.scss'

const newsList = [
  {
    id: '11',
    title: '美国众议长称第四轮经济救助计划至少1万亿美元',
    imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/news-7.jpeg',
  },
  {
    id: '22',
    title: '华为 P40 Pro+ 的十倍光变是怎样实现的？',
    brief: '从过去的数字变焦、混合变焦，再到今天的光学变焦，手机的远摄能力正如它们的性能一样在不停变化',
    imageList: [
      {
        id: '1',
        imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/news-1.jpeg',
      },
      {
        id: '2',
        imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/news-2.jpeg',
      },
    ],
  },
  {
    id: '22',
    title: '我退役了，要专注练习龙吸水',
    brief: '退役专注龙吸水！“田径泥石流”张国伟的沙雕日常',
    imageList: [
      {
        id: '1',
        imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/news-3.jpeg',
      },
      {
        id: '2',
        imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/news-4.jpeg',
      },
      {
        id: '3',
        imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/news-5.jpeg',
      },
    ],
  },
  {
    id: '333',
    title: '中国发布新冠肺炎疫情信息、推进疫情防控国际合作纪事',
  },
]
const productList = [
  {
    id: 1,
    preTag: '促',
    tags: ['专业', '防水'],
    brand: '3M',
    name: '成人雨衣半透明，粉色佳人',
    price: 13.8,
    imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/product-1.jpg',
  },
  {
    id: 2,
    preTag: '柴',
    tags: ['香', '五常'],
    brand: '柴火大院',
    name: '真五常稻花香香米',
    price: 72.99,
    imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/product-2.jpg',
  },
  {
    id: 3,
    preTag: '买',
    tags: ['iPhone', 'HDR'],
    brand: '苹果',
    name: '新品 iPhone11 Pro',
    price: 9088.0,
    imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/product-3.png',
  },
  {
    id: 4,
    preTag: '坑',
    tags: ['半成品'],
    brand: '必胜客',
    name: '想吃披萨又觉得外面的披萨不卫生又贵',
    price: 39.2,
    imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/product-4.jpg',
  },
]
const defaultDocument = 'https://nice-router.oss-cn-chengdu.aliyuncs.com/README.docx'
const movieList = [
  {
    id: 1,
    title: '始动/启动/青春催落去(台)',
    brief:
      '离家出走的叛逆儿泽日（朴正民饰）与盲目踏入社会并满腔热血的尚弼（丁海寅饰），在遇见长风饭馆的厨师长猛男哥（马东锡饰）后，让自己明白了什么是世间愉快与开心的故事。',
    createTime: new Date('2019-10-11'),
    status: '韩剧',
    documentUrl: defaultDocument,
    imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/movie-1.jpg',
  },
  {
    id: 2,
    title: '《多力特的奇幻冒险》BD中英双字幕',
    brief:
      '失去妻子后的7年中，约翰·杜立德医生把自己关在庄园里与动物相伴。当时年轻的女王身患重病，杜立德医生不情愿出门冒险，前往神秘的岛屿寻找治疗方法，这让他重获勇气和智慧，因为他击败了老对手，还发现了奇妙的新生物。',
    createTime: new Date('2020-02-05'),
    status: '喜剧',
    documentUrl: defaultDocument,
    imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/movie-2.jpg',
  },
]
const businessCardList = [
  {
    id: 1,
    title: '和珅',
    brief: '职位：总经理\n电话:13888888888\n 成都双链科技有限责任公司',
    status: 'VIP',
    imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-1.png',
  },
  {
    id: 2,
    title: '张无忌',
    brief: '职位：CEO\n电话:13900000001\n 中国三条腿（集团）公司',
    status: '牛',
    imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-2.jpg',
  },
]
const userList = [
  {
    id: 1,
    title: '小陈不哭',
    brief: '欢迎打赏人气主播',
    imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-3.jpg',
  },
  {
    id: 2,
    title: '柠檬',
    brief: '少女风，直播中。。。。',
    imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-4.jpg',
  },
  {
    id: 3,
    title: '嗯嗯嗯',
    brief: '关注我，嗯嗯嗯',
    imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-5.jpg',
  },
]

const obj = {
  title: '我看好的ETF',
  brief: '亏钱，割韭菜',
  flag: '牛',
  imageUrl: MockService.defaultImage,
  status: '待处理',
}
const cardList = [
  //竖版
  //横版-没图
  { id: '31', ...obj, mode: ['vertical', 'default', 'vertical-small'], imageUrl: '', flag: '急' }, // 默认的 horizontal
  { id: '32', ...obj, mode: ['vertical', 'normal'], imageUrl: '', flag: '急' }, // 默认的 horizontal
  { id: '33', ...obj, mode: ['vertical', 'primary'], imageUrl: '', flag: '如' }, // 默认的 horizontal
  { id: '34', ...obj, mode: ['vertical', 'warn'], imageUrl: '', flag: '律' }, // 默认的 horizontal
  { id: '35', ...obj, mode: ['vertical', 'danger'], imageUrl: '', flag: '令' }, // 默认的 horizontal

  //默认，imageOnLeft
  { id: '1', ...obj, status: '待处理' }, //方图，一行title，一行brief，小的flag+最多3个字

  //竖版
  { id: '11', ...obj, mode: ['vertical'] }, // 竖版，1/2屏幕宽，小的flag+最多3个字
  { id: '12', ...obj, mode: ['vertical', 'vertical-small', 'circle'] }, // 竖版，小圆图，1/2屏幕宽，小的flag+最多3个字

  //横版-有图
  { id: '21', ...obj, mode: ['horizontal'] }, // 默认的 horizontal
  { id: '22', ...obj, mode: ['horizontal', 'circle', 'small'] }, //小圆图
  { id: '23', ...obj, mode: ['horizontal', 'circle', 'avatar'] }, //头像，带光圈
  { id: '24', ...obj, mode: ['horizontal', 'circle', 'large'] }, //大圆图
  {
    id: '25',
    ...obj,
    mode: ['horizontal', 'large'],
    brief: '真的牛逼不需要解释\n真的牛逼不需要解释\n真的牛逼不需要解释\n真的牛逼不需要解释',
  }, //大方图

  //横版-没图
  { id: '31', ...obj, mode: ['horizontal', 'default', 'small'], imageUrl: '', flag: '急' }, // 默认的 horizontal
  { id: '32', ...obj, mode: ['horizontal', 'normal'], imageUrl: '', flag: '急' }, // 默认的 horizontal
  { id: '33', ...obj, mode: ['horizontal', 'primary', 'large'], imageUrl: '', flag: '如' }, // 默认的 horizontal
  { id: '34', ...obj, mode: ['horizontal', 'warn'], imageUrl: '', flag: '律' }, // 默认的 horizontal
  { id: '35', ...obj, mode: ['horizontal', 'danger'], imageUrl: '', flag: '令' }, // 默认的 horizontal
]

function HelloDaaSPage() {
  const list = userList.slice(0, 1)
  return (
    <View className='hello-daas'>
      <SectionBar title='卡片-大卡片' brief='big-card' />
      <Listof list={businessCardList} displayMode='big-card' />

      <SectionBar title='卡片-水平卡片' brief='h-card' />
      <Listof list={list} displayMode='h-card' />

      <SectionBar title='卡片-垂直卡片(两个装)' brief='v-card' />
      <Listof list={newsList} displayMode='v-card' />

      <SectionBar title='卡片-用户卡片' brief='user' />
      <Listof list={userList} displayMode='user' />

      <SectionBar title='卡片-文件卡片' brief='document' />
      <Listof list={movieList} displayMode='document' />

      <SectionBar title='基础卡片' brief='card' />
      <View className='note'>通过mode来控制card，获取更多效果</View>
      <View className='note'>
        mode=horizontal|vertical, circle, avatar,vertical-small, small|large,default|normal|primary|warn|darger
      </View>
      <Listof list={cardList} displayMode='card' />

      {/*<SectionBar title='上图+下文字，水平滑动' brief='displayMode：image-on-top-horizontal' />*/}
      <SectionBar title='电商-商品' brief='product' />
      <Listof list={productList} displayMode='product' />

      <SectionBar title='通用图文-Auto系列' />
      <View className='note'> displayMode=auto|single-image|double-image|three-image</View>
      <Listof list={newsList} displayMode='auto' />

      <SectionBar title='图片在下方的Auto' brief='image-on-bottom' />
      <Listof list={newsList.slice(1, 2)} displayMode='image-on-bottom' />
    </View>
  )
}

export default HelloDaaSPage
```
