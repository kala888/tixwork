import React from 'react'
import { toRpx } from '@/utils/index'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { AtDivider } from 'taro-ui'

function EleBreakLine({ color, height, text, fontColor, customStyle, className }) {
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

  const rootClass = classNames('ele-break-line', className)
  return (
    <View className={rootClass} style={style}>
      {text.length > 0 && <AtDivider height={fixedHeight} content={text} fontColor={fontColor} lineColor={color} />}
    </View>
  )
}

EleBreakLine.defaultProps = {
  color: '#ddd',
  height: 1,
  text: '',
  fontColor: '#ddd',
  customStyle: {},
  className: null,
}
export default EleBreakLine
