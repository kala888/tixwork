import { AtInput } from 'taro-ui'
import { View } from '@tarojs/components'

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
