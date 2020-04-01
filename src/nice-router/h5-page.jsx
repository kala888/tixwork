import Taro from '@tarojs/taro'
import { WebView } from '@tarojs/components'

export default class H5Page extends Taro.PureComponent {
  render() {
    const { uri = false } = this.$router.params || {}
    console.log('action path in H5', uri)
    return uri && <WebView src={uri} />
  }
}
