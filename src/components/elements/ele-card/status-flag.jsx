import React from 'react'
import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import './status-flag.scss'

function StatusFlag({ title = '', mode = 'normal' }) {
  const length = title.length

  const txtClass = classNames('status-flag-txt', {
    'status-flag-txt_large': length < 3,
    'status-flag-txt_normal': length === 3,
    'status-flag-txt_small': title.length === 4,
    'status-flag-txt_tiny': title.length > 4,
  })

  const rootClass = classNames('status-flag', `status-flag_${mode}`)

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
