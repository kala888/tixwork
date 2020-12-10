import React from 'react'
import ActionUtil from '@/nice-router/action-util'

import NavigationService from '@/nice-router/navigation-service'
import { isEmpty, isNotEmpty } from '@/nice-router/nice-router-util'
import ServerImage from '@/server-image/server-image'
import { Swiper, SwiperItem, Video, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import classNames from 'classnames'

import './styles.scss'

function EleCarousel(props) {
  const {
    items,
    autoplay,
    interval,
    duration,
    circular,
    indicatorColor,
    indicatorActiveColor,
    indicatorDots,
    customStyle,
    className,
    mode,
  } = props

  if (isEmpty(items)) {
    return null
  }

  const handleClick = async (item = {}) => {
    const { videoUrl = '', imageUrl } = item
    console.log('carousel viewed', item)

    if (isNotEmpty(videoUrl)) {
      return
    }

    if (ActionUtil.isActionLike(item)) {
      NavigationService.view(item)
      return
    }

    if (isEmpty(videoUrl) && isNotEmpty(imageUrl)) {
      await Taro.previewImage({ urls: [imageUrl] })
    }
  }

  const showDots = indicatorDots === null ? items.length > 1 : indicatorDots

  const rootClass = classNames('ele-carousel', className)
  return (
    <View className={rootClass} style={customStyle}>
      <Swiper
        autoplay={autoplay}
        interval={interval}
        duration={duration}
        circular={circular}
        indicatorColor={indicatorColor}
        indicatorActiveColor={indicatorActiveColor}
        indicatorDots={showDots}
        className='ele-carousel-item'
      >
        {items.map((it) => {
          const { videoUrl = '', imageUrl } = it
          return (
            <SwiperItem key={it.id} onClick={() => handleClick(it)} className='ele-carousel-item'>
              {videoUrl.length > 0 ? (
                <Video
                  className='ele-carousel-item'
                  src={videoUrl}
                  controls
                  autoplay={it.autoplay}
                  poster={imageUrl}
                  initialTime='0'
                  loop
                  muted={false}
                  direction={90}
                />
              ) : (
                <ServerImage className='ele-carousel-item' src={it.imageUrl} mode={mode} size='large' />
              )}
            </SwiperItem>
          )
        })}
      </Swiper>
    </View>
  )
}

EleCarousel.defaultProps = {
  items: [],
  autoplay: false,
  interval: 5000,
  duration: 1000,
  circular: true,
  indicatorColor: 'rgba(255, 255, 255, 0.6)',
  indicatorActiveColor: '#fff',
  indicatorDots: null,
  customStyle: {},
  className: null,
  mode: 'aspectFill',
}

export default EleCarousel
