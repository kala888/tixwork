import React from 'react'
import ServerImage from '@/server-image/server-image'
import { toRpx } from '@/utils/index'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import { AtTag } from 'taro-ui'

import './styles.scss'

function EleStoreLocation(props) {
  const {
    longitude,
    latitude,
    address,
    iconColor,
    imageUrl,
    name,
    phoneNumber,
    summary,
    padding,
    showBrief,
    showAddress,
    showPhoneNumber,
    tags,
    className,
  } = props

  const makePhoneCall = () => {
    if (phoneNumber) {
      // noinspection JSIgnoredPromiseFromCall
      Taro.makePhoneCall({
        phoneNumber,
      })
    }
  }

  const showLocation = () => {
    if (longitude && latitude) {
      const location = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        scale: 18,
        name: address,
      }
      // noinspection JSIgnoredPromiseFromCall
      Taro.openLocation(location)
    }
  }

  const rootClass = classNames('ele-store-location', className)

  return (
    <View className={rootClass} style={{ margin: `0 ${toRpx(padding)}` }}>
      {showBrief && (
        <View className='header'>
          <ServerImage className='header-image' src={imageUrl} mode='widthFix' />

          <View className='header-right'>
            <View className='header-right-name'>{name}</View>

            {summary.length > 0 && <View className='header-right-summary'>{summary}</View>}

            {tags.length > 0 && (
              <View className='header-right-tags'>
                {tags.map((it) => (
                  <View key={it} className='header-right-tags-item'>
                    <AtTag size='small' key={it}>
                      {' '}
                      {it}{' '}
                    </AtTag>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      )}

      {showAddress && (
        <View className='info-item' onClick={showLocation}>
          <View className='iconfont iconfont-location' style={{ color: iconColor }} />
          <View className='info-item-txt'>{address}</View>
        </View>
      )}

      {showPhoneNumber && (
        <View className='info-item' onClick={makePhoneCall}>
          <View className='iconfont iconfont-phone' style={{ color: iconColor }} />
          <View className='info-item-txt'>{phoneNumber}</View>
        </View>
      )}
    </View>
  )
}

EleStoreLocation.defaultProps = {
  address: '店铺在这里',
  longitude: null,
  latitude: null,
  iconColor: '#3399ff',
  imageUrl: '',
  name: '店铺名称',
  phoneNumber: '',
  summary: '',
  padding: 24,
  showBrief: true,
  showAddress: true,
  showPhoneNumber: true,
  tags: [],
  className: null,
}

export default EleStoreLocation
