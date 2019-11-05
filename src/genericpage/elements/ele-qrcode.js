import Taro from '@tarojs/taro'
import QRCode from '@/components/common/qrcode'

export default class EleQRCode extends Taro.PureComponent {
  render() {
    const { size, customStyle, text, bgColor, color } = this.props
    return (
      <QRCode canvasId='ele-canvas' text={text} size={size} style={customStyle} bgColor={bgColor} fgColor={color} />
    )
  }
}
