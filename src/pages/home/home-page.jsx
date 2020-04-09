import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import EleCarousel from '@/genericpage/elements/ele-carousel'
import ActionFloor from '@/components/common/action-floor'
import { usePageTitle, usePullDown } from '@/service/use.service'
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
      </View>
    </View>
  )
}

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
    brief: '好用',
    linkToUrl: 'page:///pages/biz/listof-test-page',
  },
  {
    id: 2,
    title: 'Generic Page 测试',
    brief: '省心',
    linkToUrl: 'mock-generic-page/',
  },
  {
    id: 3,
    title: 'Generic Form 测试',
    brief: '牛逼',
    linkToUrl: 'mock-generic-form/',
  },
  {
    id: 4,
    title: 'H5 baidu 测试',
    brief: '无敌',
    linkToUrl: 'https://www.baidu.com',
  },
  {
    id: 5,
    title: 'Login 页面',
    linkToUrl: 'page:///pages/login/login-page',
  },
]

export default connect(({ home }) => ({ ...home }))(HomePage)
