import React from 'react'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import ImageTools from '@/server-image/image-tools'
import ServerImage from '@/server-image/server-image'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import './styles.scss'

function InfoImage({ imageUrl }) {
  const handleImagePreview = () => {
    if (isNotEmpty(imageUrl)) {
      const url = ImageTools.getServerImagUrl(imageUrl, 'origin')
      Taro.previewImage({ urls: [url] })
    }
  }

  return (
    <View className='info-image' onClick={handleImagePreview}>
      <ServerImage src={imageUrl} size='large' mode='widthFix' />
    </View>
  )
}

export default InfoImage
