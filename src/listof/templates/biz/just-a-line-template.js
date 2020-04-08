import { formatMoney } from '@/utils/index'
import { View } from '@tarojs/components'

export default function JustALineTemplate(props) {
  const { item = {} } = props
  const { title, amount = 0 } = item
  return (
    <View className='justALine'>
      <View>{title}</View>
      <View>{formatMoney(amount)}</View>
    </View>
  )
}