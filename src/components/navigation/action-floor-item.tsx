import React from 'react'
import NavigationService from '@/nice-router/navigation-service'
import { isEmpty } from '@/nice-router/nice-router-util'
import ServerImage from '@/server-image/server-image'
import { Block, View } from '@tarojs/components'
import classNames from 'classnames'

import './action-floor.scss'

function ActionFloorItem(props) {
  const { action, className } = props
  if (isEmpty(action)) {
    return <Block />
  }

  const onClick = () => {
    NavigationService.view(action)
  }

  const { title = 'action', brief = 'brief', imageUrl } = action
  const rootCls = classNames('action-floor-item', className)
  return (
    <View className={rootCls} onClick={onClick}>
      {imageUrl ? (
        <ServerImage className='action-floor-item-image' mode='scaleToFill' src={imageUrl} />
      ) : (
        <View className='action-floor-item-title'>{title}</View>
      )}
      <View className='action-floor-item-brief'>
        <View className='action-floor-item-brief-txt'> {brief}</View>
      </View>
    </View>
  )
}

ActionFloorItem.defaultProps = {
  action: {},
}

export default ActionFloorItem
