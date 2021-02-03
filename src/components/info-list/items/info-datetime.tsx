import React from 'react'
import { formatTime } from '@/utils/index'
import { View } from '@tarojs/components'

import './styles.scss'

export default function InfoDatetime({ value, format }) {
  const displayValue = formatTime(value, format)

  return <View className='info-datetime'>{displayValue}</View>
}
