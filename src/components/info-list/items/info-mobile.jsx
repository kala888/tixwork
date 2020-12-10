import React from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getExtMode } from '@/nice-router/nice-router-util'
import './styles.scss'

function InfoMobile({ value = '', className }) {
  const onClick = () => {
    Taro.makePhoneCall({ phoneNumber: value })
  }
  const rootClass = getExtMode().classNames('info-mobile', className)
  return (
    <View className={rootClass} onClick={onClick}>
      {value}
    </View>
  )
}

export default InfoMobile
