import React from 'react'
import { Text, View } from '@tarojs/components'
import { getExtMode } from '@/nice-router/nice-router-util'
import './status-flag.scss'

function StatusFlag({ title = '', mode = 'normal' }) {
  const length = title.length

  const txtClass = getExtMode({
    txt_large: length < 3,
    txt_normal: length === 3,
    txt_small: title.length === 4,
    txt_tiny: title.length > 4,
  }).classNames('status-flag-txt')

  const rootClass = getExtMode(mode).classNames('status-flag')

  return (
    length > 0 && (
      <View className={rootClass}>
        <View className='status-flag-bg' />
        <Text className={txtClass}>{title}</Text>
      </View>
    )
  )
}

export default StatusFlag
