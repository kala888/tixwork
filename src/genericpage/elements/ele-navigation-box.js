import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import ServerImage from '@/components/image/server-image'

import './ele.scss'
import EleHelper from '../ele-helper'

export default class EleNavigationBox extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    lineOfItems: 3,
    bgColor: '#fff',
    borderRadius: '50%',
    paddingHorizontal: 20,
    kids: [],
    className: null,
  }

  render() {
    const { lineOfItems, bgColor, borderRadius, paddingHorizontal, kids, className } = this.props

    const width = (750 - paddingHorizontal * 2) / lineOfItems
    const imageWidth = `${width - 12 * lineOfItems}rpx`
    const boxStyle = { width: `${width}rpx`, height: `${width + 40}rpx` }
    const imageStyle = { width: imageWidth, height: imageWidth, borderRadius }
    const rootClass = EleHelper.classNames('ele-navigation-box-bar', className)

    return (
      <View
        className={rootClass}
        style={{
          backgroundColor: bgColor,
          paddingLeft: `${paddingHorizontal}rpx`,
          paddingRight: `${paddingHorizontal}rpx`,
        }}
      >
        {kids.map((it) => {
          const { id } = it
          return (
            <View key={id} className='ele-navigation-box-bar-item' style={boxStyle}>
              <ServerImage customStyle={imageStyle} src={it.imageUrl} />
              <View className='ele-navigation-box-bar-item-txt' style={{ color: it.color }}>
                {it.title}
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}
