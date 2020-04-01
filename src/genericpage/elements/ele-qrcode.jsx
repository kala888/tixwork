import Taro from '@tarojs/taro'
import Qrcode from '@/components/common/qrcode'

export default class EleQrcode extends Taro.PureComponent {
  render() {
    const { size, customStyle, text, bgColor, color } = this.props
    return (
      <Qrcode canvasId='ele-canvas' text={text} size={size} style={customStyle} bgColor={bgColor} fgColor={color} />
    )
  }
}
