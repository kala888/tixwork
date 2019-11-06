import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import EleImagePicker from '@/genericpage/form/ele-image-picker'

export default class HelloDaaSPage extends Taro.Component {
  render() {
    return (
      <View>
        <EleImagePicker />
      </View>
    )
  }
}
