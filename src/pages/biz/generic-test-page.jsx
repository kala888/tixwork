import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import NavigationService from '@/nice-router/navigation.service'

export default class GenericTestPage extends Taro.PureComponent {
  componentDidMount() {
    NavigationService.view('mock-generic-page/')
  }

  render() {
    return <View />
  }
}
