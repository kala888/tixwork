import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import EleCarousel from '@/genericpage/elements/ele-carousel'
import ActionFloor from '@/components/common/action-floor'

import './home.scss'

const defaultImageUrl = 'http://www.eastphoto.cn/indexImages/ep-012136603.jpg'

@connect(({ home }) => ({ ...home }))
export default class HomePage extends Taro.PureComponent {
  render() {
    const {
      slideList = [{ imageUrl: defaultImageUrl }, { imageUrl: defaultImageUrl }],
      actionList = [1, 2, 3, 4, 5],
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
