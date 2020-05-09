import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import MockService from '@/nice-router/request/mock-service'
import Listof from '@/listof/listof'
import { AtButton } from 'taro-ui'

import './home.scss'

const obj = {
  title: '我看好的ETF',
  brief: '亏钱，割韭菜',
  flag: '牛',
  imageUrl: MockService.defaultImage,
  status: '待处理',
}
const mockList = [
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

function HomePage() {
  return (
    <View className='home-page'>
      <View style={{ width: '10px' }}>
        <AtButton size='small' full={false}>
          提交
        </AtButton>
      </View>

      <Listof list={mockList} displayMode='ele-card' />
    </View>
  )
}

export default connect(({ home }) => ({ ...home }))(HomePage)
