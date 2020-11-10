import React from 'react'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import ServerImage from '@/server-image/server-image'
import { Text, View } from '@tarojs/components'
import classNames from 'classnames'

import './action-icon.scss'

/**
 *  有icon，优先展示ICON
 */
function ActionIcon({ icon, imageUrl, className, mode }) {
  if (isNotEmpty(icon)) {
    const isBizFont = icon.startsWith('bizfont-')
    const rootClass = classNames(
      'action-icon',
      'iconfont',
      {
        bizfont: isBizFont,
        [icon]: isBizFont,
        [`iconfont-${icon}`]: !isBizFont,
      },
      className,
      mode
    )
    return <Text className={rootClass} />
  }

  return (
    <View className='action-icon action-image'>
      <ServerImage customStyle={{ width: '100%', height: '100%' }} mode={mode} src={imageUrl} />
    </View>
  )
}

export default ActionIcon
