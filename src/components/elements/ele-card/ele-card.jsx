import React from 'react'
import EleActionList from '@/components/elements/action-list/ele-action-list'
import StatusFlag from '@/components/elements/ele-card/status-flag'
import NavigationService from '@/nice-router/navigation.service'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import ServerImage from '@/server-image/server-image'
import { Text, View } from '@tarojs/components'
import classNames from 'classnames'

import './styles.scss'
/*
 * Copyright(c) 2020 nice-router
 *    Date: 2020/5/9 下午4:48
 *    Author: Kala
 */

//mode=small,large
function EleCard(props) {
  const { title, brief, imageUrl, status, flag, level, actionList } = props
  const { mode = [] } = props
  const flagSize = mode.includes('large') ? 'large' : 'small'
  const hasImage = isNotEmpty(imageUrl)
  if (!hasImage) {
    mode.push('as-text')
    mode.push(level)
  }
  const onClick = () => {
    if (isNotEmpty(actionList)) {
      NavigationService.view(props)
    }
  }

  const extClass = mode.filter((it) => isNotEmpty(it)).map((it) => 'ele-card_' + it)

  const rootClass = classNames('ele-card', extClass)
  return (
    <View className='card-container'>
      <View className={rootClass}>
        <StatusFlag title={status} mode={flagSize} />

        <View className='ele-card-cover' onClick={onClick}>
          {hasImage ? (
            <ServerImage className='ele-card-cover-image' src={imageUrl} />
          ) : (
            <Text className='ele-card-cover-txt'>{flag}</Text>
          )}
        </View>
        {props.children ? (
          props.children
        ) : (
          <View className='ele-card-info'>
            <Text className='ele-card-info-title'>{title}</Text>
            <Text className='ele-card-info-brief'>{brief}</Text>
            {actionList.length > 0 && (
              <View className='card-action-list'>
                <EleActionList mode={['right', 'small']} list={actionList} />
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  )
}

EleCard.defaultProps = {
  title: '',
  brief: '',
  imageUrl: '',
  status: '',
  flag: '',
  level: '',
  actionList: [],
}

export default EleCard
