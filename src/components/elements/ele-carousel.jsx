import Taro from '@tarojs/taro'
import { Swiper, SwiperItem, Video, View } from '@tarojs/components'

import NavigationService from '@/nice-router/navigation.service'
import { toRpx } from '@/utils/index'
import ServerImage from '@/server-image/server-image'
import { isEmpty, isNotEmpty } from '@/nice-router/nice-router-util'
import classNames from 'classnames'

import './styles.scss'

function EleCarousel(props) {
  const {
    items,
    height,
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

  const handleClick = (item = {}) => {
    const { videoUrl = '', imageUrl } = item
    console.log('carousel viewed', item)

    if (isNotEmpty(videoUrl)) {
      return
    }

    if (NavigationService.isActionLike(item)) {
      NavigationService.view(item)
      return
    }

    if (isEmpty(videoUrl) && isNotEmpty(imageUrl)) {
      Taro.previewImage({ urls: [imageUrl] })
    }
  }

  const style = { ...customStyle, height: toRpx(height) }

  const showDots = indicatorDots === null ? items.length > 1 : indicatorDots

  const rootClass = classNames('ele-carousel', className)
  return (
    <View className={rootClass} style={style}>
      <Swiper
        autoplay={autoplay}
        interval={interval}
        duration={duration}
        circular={circular}
        indicatorColor={indicatorColor}
        indicatorActiveColor={indicatorActiveColor}
        indicatorDots={showDots}
        style={style}
      >
        {items.map((it) => {
          const { videoUrl = '', imageUrl, id } = it
          return (
            <SwiperItem key={id} onClick={handleClick.bind(this, it)} className='ele-carousel-item' customStyle={style}>
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
                  style={style}
                />
              ) : (
                <View className='ele-carousel-item'>
                  <ServerImage src={it.imageUrl} mode={mode} size='large' />
                </View>
              )}
            </SwiperItem>
          )
        })}
      </Swiper>
    </View>
  )
}

EleCarousel.options = {
  addGlobalClass: true,
}

EleCarousel.defaultProps = {
  items: [],
  height: 167,
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
