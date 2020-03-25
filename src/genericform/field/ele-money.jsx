import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import NumberInput from './ele-number-input'
import './styles.scss'

export default class EleMoney extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  render() {
    return (
      <View className='ele-money'>
        <View className='ele-money-icon'>￥</View>
        <NumberInput {...this.props} />
      </View>
    )
  }
}
