import React from 'react'
import { useVisible } from '@/service/use-service'
import { View, WebView } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import { Current } from '@tarojs/taro'

export default function H5Page() {
  const { visible, close } = useVisible(true)
  const { uri = '' } = Current.router.params || {}
  const src = decodeURIComponent(uri)
  console.log('action path in H5', src)
  return (
    <View>
      <AtActivityIndicator isOpened={visible} size={50} mode='center' />
      <WebView src={src} onLoad={close} />
    </View>
  )
}
