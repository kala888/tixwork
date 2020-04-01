import { ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtCurtain } from 'taro-ui'
import EleFlex from './ele-flex'

export default class ElePopup extends Taro.PureComponent {
  state = {
    show: true,
  }

  close = () => {
    this.setState({
      show: false,
    })
  }

  render() {
    return (
      <AtCurtain isOpened={this.state.show} onClose={this.close}>
        <ScrollView scrollY scrollWithAnimation scrollTop='0' style='max-height: 750rpx;'>
          <EleFlex {...this.props} />
        </ScrollView>
      </AtCurtain>
    )
  }
}
