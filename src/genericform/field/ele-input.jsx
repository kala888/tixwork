import { AtInput } from 'taro-ui'
import { View } from '@tarojs/components'
import { noop } from '@/nice-router/nice-router-util'

// type: text, password, number, idcard, digit, phone
// type: money
// className: "", noLabel, noBorder, underLine

export default (props) => {
  const { onChange = noop, ...others } = props
  return (
    <View>
      <AtInput border={false} {...others} onChange={onChange} />
    </View>
  )
}
