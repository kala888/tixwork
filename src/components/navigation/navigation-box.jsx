import React from 'react'
import ActionIcon from '@/components/action-icon/action-icon'
import { getExtMode, isNotEmpty } from '@/nice-router/nice-router-util'
import { Text, View } from '@tarojs/components'

import EleBadge from '@/components/elements/ele-badge/ele-badge'
import EleButton from '@/components/elements/ele-button'

import './navigation-box.scss'

function NavigationBox(props) {
  const { title: actionBarTitle = '', list = [] } = props
  const { className, customStyle = {}, roundBottom = true, roundTop = true } = props

  const rootClass = getExtMode({
    center: list.length <= 5,
    'round-bottom': roundBottom,
    'round-top': roundTop,
  }).classNames('navigation-box', className)

  return (
    <View className={rootClass} customStyle={customStyle}>
      {isNotEmpty(actionBarTitle) && <View className='navigation-box-title'>{actionBarTitle}</View>}
      <View className='navigation-box-actions'>
        {list.map((it) => {
          const { icon, imageUrl, title, badge, disabled } = it
          const itemClass = getExtMode({ disabled }).classNames('navigation-box-item')

          return (
            <EleButton mode='ghost' key={`${it.id}_${it.code}`} className={itemClass} {...it}>
              <EleBadge value={badge}>
                <ActionIcon icon={icon} imageUrl={imageUrl} />
                <Text className='navigation-box-item-title'>{title}</Text>
              </EleBadge>
            </EleButton>
          )
        })}
      </View>
    </View>
  )
}

export default NavigationBox
