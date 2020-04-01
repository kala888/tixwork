import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import NavigationService from '@/nice-router/navigation.service'
import Config from '@/utils/config'

export default class GenericTestPage extends Taro.PureComponent {
  componentDidMount() {
    NavigationService.view(Config.api.GenericPageMock)
  }

  render() {
    return <View />
  }
}
