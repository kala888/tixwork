import React from 'react'
import ActionIcon from '@/components/action-icon/action-icon'
import NavigationService from '@/nice-router/navigation-service'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { AtBadge } from 'taro-ui'

import './navigation-box.scss'

function NavigationBox(props) {
  const { title: actionBarTitle = '', list = [] } = props
  const { className, customStyle = {}, roundBottom = true, roundTop = true } = props

  const handleClick = (item) => {
    if (!item.disabled) {
      NavigationService.view(item)
    }
  }

  const rootClass = classNames('navigation-box', className, {
    'navigation-box-center': list.length <= 5,
    'round-bottom': roundBottom,
    'round-top': roundTop,
  })

  return (
    <View className={rootClass} customStyle={customStyle}>
      {isNotEmpty(actionBarTitle) && <View className='navigation-box-title'>{actionBarTitle}</View>}
      <View className='navigation-box-actions'>
        {list.map((it) => {
          const { icon, imageUrl, title, badge, disabled } = it
          const itemClass = classNames('navigation-box-item', {
            'navigation-box-item--disabled': disabled,
          })

          return (
            <View key={`${it.id}_${it.code}`} className={itemClass} onClick={handleClick.bind(this, it)}>
              <View className='navigation-box-item-box'>
                <AtBadge value={badge}>
                  <ActionIcon className='navigation-box-item-image' icon={icon} imageUrl={imageUrl} />
                </AtBadge>
                <View className='navigation-box-item-title'>{title}</View>
              </View>
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default NavigationBox
