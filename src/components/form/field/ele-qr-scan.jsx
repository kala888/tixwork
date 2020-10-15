import React from 'react'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import _ from 'lodash'
import { noop } from '@/nice-router/nice-router-util'

import './styles.scss'

function EleQrScan(props) {
  const { value = '', disabled, onChange = noop } = props

  const handleScan = async () => {
    const { result } = await Taro.scanCode({})
    onChange(result)
  }

  let displayValue = value || ''
  if (displayValue.indexOf('_d=') > -1) {
    displayValue = displayValue.substr(displayValue.indexOf('_d=') + 3, displayValue.length)
  } else if (displayValue.length >= 10) {
    displayValue = displayValue.substr(displayValue.length - 10, 10)
  }

  return (
    <View className='ele-qr-scan'>
      <View className='ele-qr-scan-value'>{_.trim(displayValue)}</View>
      <AtButton size='small' disabled={disabled} onClick={handleScan}>
        扫码
      </AtButton>
    </View>
  )
}

export default EleQrScan
