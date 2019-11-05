import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import EleCarousel from '@/genericpage/elements/ele-carousel'
import EleHelper from '@/genericpage/ele-helper'

import './styles.scss'
import NavigationBoxBar from '../navigation-box-bar'

class CardHeader extends Taro.PureComponent {
  render() {
    const { items = [], navigationBoxList = [], carouselHeight = 150 } = this.props

    const rootClass = EleHelper.classNames('card-header', {
      radiusTop: navigationBoxList.length > 0,
    })

    return (
      <View className={rootClass}>
        <View className='card-header_top-background' />
        <View className='card-header_navigation'>
          <EleCarousel indicatorActiveColor='#28AAFF' items={items} height={carouselHeight} />
          {navigationBoxList.length > 0 && (
            <View className='card-header_navigation-bar'>
              <NavigationBoxBar list={navigationBoxList} />
            </View>
          )}
        </View>
      </View>
    )
  }
}

export default CardHeader
