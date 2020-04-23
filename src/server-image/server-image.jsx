import { Image, View } from '@tarojs/components'
import classNames from 'classnames'
import ImageTools from './image-tools'

import './styles.scss'

//scaleToFill, aspectFit, aspectFill, widthFix，heightFix, center, ...
function ServerImage(props) {
  const { mode = 'aspectFill', className, src, uri, size, customStyle = {} } = props
  const rootCls = classNames('server-image', className)
  const remotePath = ImageTools.getServerImagUrl(src || uri, size)

  return (
    <View className={rootCls} style={customStyle}>
      <Image className='server-image-img' src={remotePath} mode={mode} />
    </View>
  )
}

ServerImage.options = {
  addGlobalClass: true,
}
// ServerImage.externalClasses = ['my-class'] //外部的新样式

export default ServerImage
