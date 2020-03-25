import { View } from '@tarojs/components'
import { AtSwitch } from 'taro-ui'
import { toBoolean } from '@/nice-router/nice-router-util'

// candidateValues 就是 options
// candidateValues = [{
//   id: '11',
//   title: '男',
//   value: 'true',
// }, {
//   id: '22',
//   title: '女',
//   value: 'false',
// }]
export default (props) => {
  const { value = false, candidateValues = [], ...others } = props
  const checked = toBoolean(value)
  const selected = candidateValues.find((it) => toBoolean(it.value) === checked)
  const title = selected ? selected.title : ''
  return (
    <View>
      <AtSwitch {...others} border={false} checked={checked} title={title} />
    </View>
  )
}
