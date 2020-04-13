import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import EleCarousel from '@/genericpage/elements/ele-carousel'
import ActionFloor from '@/components/common/action-floor'
import { usePageTitle, usePullDown } from '@/service/use.service'
import SectionBar from '@/components/common/section-bar'
import Listof from '@/listof/listof'

import './home.scss'

function HomePage(props) {
  const { pageTitle } = props
  usePageTitle(pageTitle)
  usePullDown(props)

  const { slideList = userList, actionList = defaultActionList } = props

  return (
    <View className='home-page'>
      <EleCarousel items={slideList} height={220} />
      <View className='home-page-action-floor'>
        <ActionFloor actions={actionList} />
        <SectionBar title='促销抢购' />
        <Listof list={productList} displayMode='product' />
      </View>
    </View>
  )
}

export default connect(({ home }) => ({ ...home }))(HomePage)

const userList = [
  {
    id: 1,
    title: '小陈不哭',
    brief: '欢迎打赏人气主播',
    imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/avatar-3.jpg',
  },
  {
    id: 2,
    title: '柠檬',
    brief: '少女风，直播中。。。。',
    imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/avatar-4.jpg',
  },
  {
    id: 3,
    title: '嗯嗯嗯',
    brief: '关注我，嗯嗯嗯',
    imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/avatar-5.jpg',
  },
]
const defaultActionList = [
  {
    id: 1,
    title: 'Listof 测试',
    brief: '有惊喜',
    linkToUrl: 'page:///pages/biz/listof-test-page',
  },
  {
    id: 2,
    title: 'GenericPage 测试',
    brief: '省心',
    linkToUrl: 'mock-generic-page/',
  },
  {
    id: 3,
    title: 'GenericForm 测试',
    brief: '牛逼',
    linkToUrl: 'mock-generic-form/',
  },
  {
    id: 4,
    title: 'H5 测试',
    brief: '某度',
    linkToUrl: 'https://www.baidu.com',
  },
  {
    id: 5,
    title: 'Login 页面',
    brief: '通用',
    linkToUrl: 'page:///pages/login/login-page',
  },
]
const productList = [
  {
    id: 1,
    preTag: '促',
    tags: ['专业', '防水'],
    brand: '3M',
    name: '成人雨衣半透明',
    price: 13.8,
    imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/product-1.jpg',
  },
  {
    id: 2,
    preTag: '快',
    tags: ['Enjoy', '厨房切菜刀'],
    brand: '双立人',
    name: '红点',
    price: 329.0,
    imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/product-5.jpg',
  },
  {
    id: 3,
    preTag: '柴',
    tags: ['香', '五常'],
    brand: '柴火大院',
    name: '五常稻花香米',
    price: 72.99,
    imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/product-2.jpg',
  },
  {
    id: 4,
    preTag: '买',
    tags: ['iPhone', 'HDR'],
    brand: '苹果',
    name: '新品 iPhone11 Pro',
    price: 9088.0,
    imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/product-3.png',
  },
  {
    id: 5,
    preTag: '坑',
    tags: ['半成品'],
    brand: '必胜客',
    name: '想吃披萨又觉得外面的披萨不卫生又贵',
    price: 39.2,
    imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/product-4.jpg',
  },
  {
    id: 6,
    preTag: '包邮',
    tags: ['好用'],
    brand: '小米',
    name: '巨能写中性笔10支装',
    price: 9.8,
    imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/product-6.jpg',
  },
]
