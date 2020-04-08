import Taro from '@tarojs/taro'
import EleVcode from '@/genericform/field/ele-vcode'
import { View } from '@tarojs/components'
import NavigationService from '@/nice-router/navigation.service'

export default class GenericTestPage extends Taro.PureComponent {
  componentDidMount() {
    console.log('mock-generic-page/')
    // NavigationService.view('mock-generic-page/')
    NavigationService.view('mock-generic-form/')
  }

  render() {
    return (
      <View>
        <EleVcode maxCount={5} />
      </View>
    )
  }
}
