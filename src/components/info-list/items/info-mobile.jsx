import React from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './styles.scss'

function InfoMobile({ value = '' }) {
  const onClick = () => {
    Taro.makePhoneCall({ phoneNumber: value })
  }
  return (
    <View className='info-mobile' onClick={onClick}>
      {value}
    </View>
  )
}

export default InfoMobile
