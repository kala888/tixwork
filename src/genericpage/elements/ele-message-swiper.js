import Taro from '@tarojs/taro'
import { Swiper, SwiperItem, Text, View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import NavigationService from '@/nice-router/navigation.service'
import { toRpx } from '@/utils/index'
import ServerImage from '@/components/image/server-image'

import './ele.scss'

import EleHelper from '../ele-helper'

export default class EleMessageSwiper extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    items: [],
    imageUrl: '',
    customStyle: {},
    imageHeight: 20,
    imageWidth: 20,
    className: null,
  }

  handleItemClick = (item) => {
    NavigationService.view(item)
  }

  render() {
    const { items, imageUrl, customStyle, imageHeight, imageWidth, className } = this.props

    const rootClass = EleHelper.classNames('ele-message-swiper', className)

    return (
      <View className={rootClass} style={customStyle}>
        <View className='ele-message-swiper-preicon'>
          {imageUrl.length > 0 ? (
            <ServerImage
              src={imageUrl}
              customStyle={{ verticalAlign: 'middle', width: `${toRpx(imageWidth)}`, height: `${toRpx(imageHeight)}` }}
            />
          ) : (
            <AtIcon value='volume-plus' size={22} />
          )}
        </View>
        <Swiper className='ele-message-swiper-messages' autoplay circular vertical>
          {items.map((it) => {
            const { id } = it
            return (
              <SwiperItem className='ele-message-swiper-messages-item' key={id}>
                <Text className='ele-message-swiper-messages-item-txt' onClick={this.handleItemClick.bind(this, it)}>
                  {it.text}
                </Text>
              </SwiperItem>
            )
          })}
        </Swiper>
      </View>
    )
  }
}
