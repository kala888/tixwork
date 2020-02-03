import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtDivider } from 'taro-ui'

import { toRpx } from '@/utils/index'
import EleHelper from '../ele-helper'

export default class EleBreakLine extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    color: '#ddd',
    height: 1,
    text: '',
    fontColor: '#ddd',
    customStyle: {},
    className: null,
  }

  render() {
    const { color, height, text, fontColor, customStyle, className } = this.props

    const fixedHeight = toRpx(height)

    const style =
      text.length > 0
        ? customStyle
        : {
            height: fixedHeight,
            backgroundColor: color,
            margin: '10rpx 0',
            ...customStyle,
          }

    const rootClass = EleHelper.classNames('ele-break-line', className)
    return (
      <View className={rootClass} style={style}>
        {text.length > 0 && <AtDivider height={fixedHeight} content={text} fontColor={fontColor} lineColor={color} />}
      </View>
    )
  }
}
