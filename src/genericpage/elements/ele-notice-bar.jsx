import { Swiper, SwiperItem, Text, View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import NavigationService from '@/nice-router/navigation.service'
import classNames from 'classnames'
import { toRpx } from '@/utils/index'
import ServerImage from '@/server-image/server-image'

import './styles.scss'

function EleNoticeBar(props) {
  const { items, imageUrl, customStyle, imageHeight, imageWidth, className } = props

  const handleItemClick = (item) => {
    NavigationService.view(item)
  }

  const rootClass = classNames('ele-notice-bar', className)

  return (
    <View className={rootClass} style={customStyle}>
      <View className='ele-notice-bar-preicon'>
        {imageUrl.length > 0 ? (
          <ServerImage
            src={imageUrl}
            customStyle={{ verticalAlign: 'middle', width: `${toRpx(imageWidth)}`, height: `${toRpx(imageHeight)}` }}
          />
        ) : (
          <AtIcon value='volume-plus' size={22} />
        )}
      </View>
      <Swiper className='ele-notice-bar-messages' autoplay circular vertical>
        {items.map((it) => {
          const { id } = it
          return (
            <SwiperItem key={id} className='ele-notice-bar-messages-item' onClick={handleItemClick.bind(this, it)}>
              <Text className='ele-notice-bar-messages-item-txt'>{it.text}</Text>
            </SwiperItem>
          )
        })}
      </Swiper>
    </View>
  )
}

EleNoticeBar.options = {
  addGlobalClass: true,
}

EleNoticeBar.defaultProps = {
  items: [],
  imageUrl: '',
  customStyle: {},
  imageHeight: 20,
  imageWidth: 20,
  className: null,
}

export default EleNoticeBar
