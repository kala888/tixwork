import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import ServerImage from '@/server-image/server-image'
import classNames from 'classnames'

import './styles.scss'

function EleImage(props) {
  const { imageUrl, src, className, customStyle, mode } = props
  const rootClass = classNames('ele-image', className)
  const path = imageUrl || src
  return (
    <View className={rootClass} style={customStyle}>
      {path ? (
        <ServerImage src={path} customStyle={customStyle} mode={mode} />
      ) : (
        <View className='image-placeholder' style={customStyle}>
          <AtIcon value='image' />
        </View>
      )}
    </View>
  )
}

EleImage.options = {
  addGlobalClass: true,
}

EleImage.defaultProps = {
  imageUrl: null,
  src: null,
  customStyle: {},
  className: null,
}

export default EleImage
