import Taro from '@tarojs/taro'
import { formatMoney } from '@/utils/index'
import { View } from '@tarojs/components'

export default class JustALineTemplate extends Taro.PureComponent {
  render() {
    const { item = {} } = this.props
    const { title, amount = 0 } = item
    return (
      <View className='justALine'>
        <View>{title}</View>
        <View>{formatMoney(amount)}</View>
      </View>
    )
  }
}
