import { View } from '@tarojs/components'
import React from 'react'

import './form-item-tail.scss'

export default function FormItemTail(props) {
  const { showClear, hasError, onClear, onShowError } = props

  return (
    <View className='form-item-tail'>
      {showClear && <View className='iconfont iconfont-close-circle' onClick={onClear} />}
      {hasError && <View className='iconfont iconfont-warning-circle' onClick={onShowError} />}
    </View>
  )
}
