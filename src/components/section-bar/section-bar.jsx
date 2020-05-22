import React from 'react'
import ActionIcon from '@/components/navigation/action-icon'
import ActionUtil from '@/nice-router/action-util'
import NavigationService from '@/nice-router/navigation.service'
import { Text, View } from '@tarojs/components'
import classNames from 'classnames'

import './styles.scss'

function SectionBar(props) {
  const { title, brief, className, customStyle = {} } = props
  const onClick = () => {
    NavigationService.view(props)
  }

  const hasMore = ActionUtil.isActionLike(props)

  const rootClass = classNames('section-bar', className)
  const actionTitle = brief || (hasMore ? 'MORE' : '')

  return (
    <View className={rootClass} style={customStyle}>
      <View className='section-bar-preicon' />
      <View className='section-bar-title'>{title}</View>
      <View className='section-bar-action' onClick={onClick}>
        <Text className='section-bar-action-title'>{actionTitle}</Text>
        {hasMore && <ActionIcon value='more' className='section-bar-action-icon' />}
      </View>
    </View>
  )
}

export default SectionBar
