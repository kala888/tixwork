import React from 'react'
import { View } from '@tarojs/components'
import { AtInput } from 'taro-ui'

// type: text, password, number, idcard, digit, phone
// type: money
// className: "", noLabel, noBorder, underLine

export default function EleInput(props) {
  return (
    <View>
      <AtInput border={false} {...props} />
    </View>
  )
}
