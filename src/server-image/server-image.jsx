import React from 'react'
import { Image } from '@tarojs/components'
import classNames from 'classnames'
import ImageTools from './image-tools'

import './styles.scss'

//scaleToFill, aspectFit, aspectFill, widthFix，heightFix, center, ...
function ServerImage(props) {
  const { mode = 'aspectFill', className, src, uri, size, customStyle = {} } = props
  const rootCls = classNames('server-image', className)
  const remotePath = ImageTools.getServerImagUrl(src || uri, size)

  return <Image className={rootCls} style={customStyle} src={remotePath} mode={mode} />
}

ServerImage.options = {
  addGlobalClass: true,
}

export default ServerImage
