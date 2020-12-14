import React from 'react'
import { Image } from '@tarojs/components'
import classNames from 'classnames'
import { isH5 } from '@/utils/index'

import ImageTools from './image-tools'
import './styles.scss'

//scaleToFill, aspectFit, aspectFill, widthFix，heightFix, center, ...
function ServerImage(props) {
  const { mode = 'aspectFill', className, src, uri, size, customStyle = {} } = props
  const rootCls = classNames('server-image', className, {
    'server-image--h5': isH5() && (mode === 'widthFix' || mode === 'heightFix'),
  })
  const remotePath = ImageTools.getServerImagUrl(src || uri, size)

  return <Image className={rootCls} style={customStyle} src={remotePath} mode={mode} />
}

export default ServerImage
