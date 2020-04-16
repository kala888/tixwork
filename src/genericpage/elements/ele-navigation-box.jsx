import { View } from '@tarojs/components'
import classNames from 'classnames'

import ServerImage from '@/server-image/server-image'

import './styles.scss'

function EleNavigationBox(props) {
  const { lineOfItems, bgColor, borderRadius, paddingHorizontal, kids, className } = props

  const width = (750 - paddingHorizontal * 2) / lineOfItems
  const imageWidth = `${width - 12 * lineOfItems}rpx`
  const boxStyle = { width: `${width}rpx`, height: `${width + 40}rpx` }
  const imageStyle = { width: imageWidth, height: imageWidth, borderRadius }
  const rootClass = classNames('ele-navigation-box-bar', className)

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

EleNavigationBox.options = {
  addGlobalClass: true,
}

EleNavigationBox.defaultProps = {
  lineOfItems: 3,
  bgColor: '#fff',
  borderRadius: '50%',
  paddingHorizontal: 20,
  kids: [],
  className: null,
}

export default EleNavigationBox
