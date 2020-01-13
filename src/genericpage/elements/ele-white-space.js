import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { toRpx } from '@/utils/index'

export default class EleWhiteSpace extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    height: 30,
    color: '#fff',
  }

  render() {
    const { height, color } = this.props
    return <View style={{ height: toRpx(height), backgroundColor: color }} />
  }
}
