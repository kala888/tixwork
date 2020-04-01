import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import EleImagePicker from '@/genericform/field/ele-image-picker'

export default class HelloDaasPage extends Taro.Component {
  render() {
    return (
      <View>
        <EleImagePicker />
      </View>
    )
  }
}
