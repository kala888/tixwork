import React from 'react';

import NavigationService from '@/nice-router/navigation-service';
import ServerImage from '@/server-image/server-image';
import { Swiper, SwiperItem, Video, View } from '@tarojs/components';
import classNames from 'classnames';
import { SwiperProps } from '@tarojs/components/types/Swiper';
import { ImageSize } from '@/server-image/image-tools';
import { ActionLike, ImageLike, VideoLike } from '@/nice-router/nice-router-types';
import { ImageProps } from '@tarojs/components/types/Image';
import ActionUtil from '@/utils/action-util';
import ImagePreview from '@/utils/image-preview';
import ObjectUtils from '@/utils/object-utils';
import './styles.less';

export type EleCarouselItem = ActionLike & ImageLike & VideoLike;

export type EleCarouselProps = {
  items?: EleCarouselItem[];
  customStyle?: React.CSSProperties;
  imageMode?: ImageProps.Mode;
} & SwiperProps;

function EleCarousel(props: EleCarouselProps) {
  const {
    items = [],
    interval,
    duration,
    indicatorColor,
    indicatorActiveColor,
    indicatorDots,
    customStyle,
    className,
    imageMode,
  } = props;

  if (ObjectUtils.isEmpty(items)) {
    return null;
  }

  const handleClick = async (item: EleCarouselItem = {}) => {
    const { videoUrl = '', imageUrl } = item;
    console.log('carousel viewed', item);

    if (ObjectUtils.isNotEmpty(videoUrl)) {
      return;
    }

    if (ActionUtil.isActionLike(item)) {
      NavigationService.view(item);
      return;
    }
    if (ObjectUtils.isEmpty(videoUrl) && ObjectUtils.isNotEmpty(imageUrl)) {
      await ImagePreview.preview(imageUrl);
    }
  };

  const showDots = indicatorDots === null ? items.length > 1 : indicatorDots;

  const rootClass = classNames('ele-carousel', className);
  return (
    <View className={rootClass} style={customStyle}>
      <Swiper
        autoplay
        interval={interval}
        duration={duration}
        // circular={circular}
        indicatorColor={indicatorColor}
        indicatorActiveColor={indicatorActiveColor}
        indicatorDots={showDots}
        className='ele-carousel-item'
      >
        {items.map((it, idx) => {
          const { videoUrl = '', imageUrl } = it;
          // @ts-ignore
          const key = `carousel-${idx}-${it.id}`;

          return (
            <SwiperItem key={key} onClick={() => handleClick(it)} className='ele-carousel-item'>
              {videoUrl.length > 0 ? (
                <Video
                  className='ele-carousel-item'
                  src={videoUrl}
                  controls
                  poster={imageUrl}
                  autoplay={false}
                  loop
                  muted={false}
                  direction={90}
                />
              ) : (
                // @ts-ignore
                <ServerImage className='ele-carousel-item' src={it.imageUrl} mode={imageMode} size={ImageSize.Large} />
              )}
            </SwiperItem>
          );
        })}
      </Swiper>
    </View>
  );
}

EleCarousel.defaultProps = {
  items: [],
  autoplay: false,
  interval: 5000,
  duration: 1000,
  circular: true,
  indicatorColor: 'rgba(255, 255, 255, 0.6)',
  indicatorActiveColor: '#fff',
  customStyle: {},
  mode: 'aspectFill',
};

export default EleCarousel;
