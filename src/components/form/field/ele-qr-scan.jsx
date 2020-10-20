import React from 'react'
import { Text, View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import _ from 'lodash'
import { isNotEmpty, noop } from '@/nice-router/nice-router-util'
import GlobalToast from '@/nice-router/global-toast'

import './styles.scss'

function EleQrScan(props) {
  const { value = '', disabled, onChange = noop } = props

  const handleScan = async () => {
    const { result } = await Taro.scanCode({})
    if (isNotEmpty(result)) {
      await GlobalToast.show({ text: '扫码成功' })
      onChange(result)
    }
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
        <Text className='iconfont iconfont-scan' />
      </AtButton>
    </View>
  )
}

export default EleQrScan
