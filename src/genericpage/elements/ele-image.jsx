import React from 'react'
import ServerImage from '@/server-image/server-image'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import './styles.scss'

function EleImage(props) {
  const { imageUrl, src, className, customStyle, mode } = props
  const rootClass = classNames('ele-image', className)
  const path = imageUrl || src
  return (
    <View className={rootClass} style={customStyle}>
      {path ? (
        <ServerImage src={path} customStyle={customStyle} mode={mode} />
      ) : (
        <View className='image-placeholder' style={customStyle}>
          <View className='iconfont file-image' />
        </View>
      )}
    </View>
  )
}

EleImage.defaultProps = {
  imageUrl: null,
  src: null,
  customStyle: {},
  className: null,
}

export default EleImage
