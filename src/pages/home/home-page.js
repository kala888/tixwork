import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import EleCarousel from '@/genericpage/elements/ele-carousel'
import ActionFloor from '@/components/common/action-floor'

import './home.scss'

const defaultImageUrl = 'http://www.eastphoto.cn/indexImages/ep-012136603.jpg'

@connect(({ home }) => ({ ...home }))
class HomePage extends Taro.PureComponent {
  render() {
    const {
      slideList = [{ videoUrl: defaultImageUrl, imageUrl: defaultImageUrl }, { imageUrl: defaultImageUrl }],
      actionList = [
        {
          title: '中华',
          brief: '牛逼',
          imageUrl: defaultImageUrl,
        },
        {
          title: '玉溪',
          brief: '也很牛逼',
        },
        3,
        4,
        5,
      ],
    } = this.props

    return (
      <View className='home-page'>
        <EleCarousel items={slideList} height={220} />
        <View className='home-page-action-floor'>
          <ActionFloor actions={actionList} />
        </View>
      </View>
    )
  }
}

export default HomePage
