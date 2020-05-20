import React from 'react'
import ActionIcon from '@/components/navigation/action-icon'
import NavigationService from '@/nice-router/navigation.service'
import { Swiper, SwiperItem, Text, View } from '@tarojs/components'

import classNames from 'classnames'
import './styles.scss'

function EleNotice(props) {
  const { items, icon, imageUrl, customStyle, className } = props

  const handleItemClick = (item) => {
    NavigationService.view(item)
  }

  const rootClass = classNames('ele-notice-bar', className)

  return (
    <View className={rootClass} style={customStyle}>
      <ActionIcon className='ele-notice-bar-icon' mode='heightFix' icon={icon} imageUrl={imageUrl} />
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

EleNotice.defaultProps = {
  items: [],
  imageUrl: '',
  customStyle: {},
  imageHeight: 20,
  imageWidth: 20,
  className: null,
}

export default EleNotice
