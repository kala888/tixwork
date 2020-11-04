import React from 'react'
import ActionUtil from '@/nice-router/action-util'
import NavigationService from '@/nice-router/navigation.service'
import { Block, Text, View } from '@tarojs/components'
import classNames from 'classnames'

import './styles.scss'

function SectionBar(props) {
  const { title, brief, className, customStyle = {}, icon = 'more', onClick } = props
  const handleClick = () => {
    if (onClick) {
      onClick()
      return
    }
    NavigationService.view(props)
  }

  const hasMore = ActionUtil.isActionLike(props)

  const rootClass = classNames('section-bar', className)
  const actionTitle = brief || (hasMore ? 'MORE' : '')

  return (
    <View className={rootClass} style={customStyle}>
      <View className='section-bar-preicon' />
      <View className='section-bar-title'>{title}</View>
      <View className='section-bar-action' onClick={handleClick}>
        {hasMore && (
          <Block>
            <Text className='section-bar-action-title'>{actionTitle}</Text>
            <Text className={`iconfont iconfont-${icon}`} />
          </Block>
        )}
      </View>
    </View>
  )
}

export default SectionBar
