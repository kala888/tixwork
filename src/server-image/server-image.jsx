import { Image } from '@tarojs/components'
import classNames from 'classnames'
import ImageTools from './image-tools'

import './styles.scss'

function ServerImage(props) {
  //scaleToFill, aspectFit, aspectFill, widthFix
  const { mode = 'aspectFill', className, src, uri, size, customStyle = {} } = props
  const rootCls = classNames('server-image', 'my-class', className)
  // const style = { width: '100%', height: '100%', ...customStyle }
  const remotePath = ImageTools.getServerImagUrl(src || uri, size)
  return <Image className={rootCls} src={remotePath} mode={mode} style={customStyle} />
}

ServerImage.options = {
  addGlobalClass: true,
}

ServerImage.externalClasses = ['my-class']
export default ServerImage
