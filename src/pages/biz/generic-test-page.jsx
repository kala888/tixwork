import Taro from '@tarojs/taro'
import EleVcode from '@/genericform/field/ele-vcode'
import NavigationService from '@/nice-router/navigation.service'

export default class GenericTestPage extends Taro.PureComponent {
  componentDidMount() {
    // NavigationService.view('mock-generic-page/')
    NavigationService.view('mock-generic-form/')
  }

  render() {
    return <EleVcode />
  }
}
