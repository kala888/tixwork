import React from 'react'
import EleActionList from '@/components/elements/action-list/ele-action-list'
import StatusFlag from '@/components/elements/ele-card/status-flag'
import NavigationService from '@/nice-router/navigation-service'
import { getExtMode, isNotEmpty } from '@/nice-router/nice-router-util'
import ServerImage from '@/server-image/server-image'
import { Text, View } from '@tarojs/components'
import CardInfoTable from '@/components/ele-table/card-info-table'

import './styles.scss'

/*
 * Copyright(c) 2020 nice-router
 *    Date: 2020/5/9 下午4:48
 *    Author: Kala
 */

//mode=small,large
function EleCard(props) {
  const { headerTitle, headerBrief, title, brief, imageUrl, status, flag, level, actionList, infoList, onClick } = props
  const { mode = [] } = props
  const flagSize = mode.includes('large') ? 'large' : 'small'
  const hasImage = isNotEmpty(imageUrl)
  const hasFlag = !hasImage && isNotEmpty(flag)
  if (!hasImage) {
    mode.push('as-text')
    mode.push(level)
  }
  const handleClick = () => {
    if (onClick) {
      onClick()
      return
    }
    if (isNotEmpty(actionList)) {
      NavigationService.view(props)
    }
  }

  const bodyClass = getExtMode(mode).classNames('card-body')

  const hasHeader = isNotEmpty(headerTitle) || isNotEmpty(headerBrief)
  const hasFooter = isNotEmpty(actionList) || isNotEmpty(infoList)
  return (
    <View className='card-container'>
      <StatusFlag title={status} mode={flagSize} />
      {hasHeader && (
        <View className='card-header'>
          <View className='card-header-title'>{headerTitle}</View>
          <View className='card-header-brief'>{headerBrief}</View>
        </View>
      )}

      <View className={bodyClass}>
        {(hasImage || hasFlag) && (
          <View className='card-body-cover' onClick={handleClick}>
            {hasImage ? (
              <ServerImage className='card-body-cover-image' src={imageUrl} />
            ) : (
              <Text className='card-body-cover-txt'>{flag}</Text>
            )}
          </View>
        )}

        <View className='card-body-info'>
          <Text className='card-body-info-title'>{title}</Text>
          <Text className='card-body-info-brief'>{brief}</Text>
        </View>
      </View>
      {hasFooter && (
        <View className='card-footer'>
          {isNotEmpty(infoList) && <CardInfoTable data={infoList} />}
          {isNotEmpty(actionList) && (
            <View className='card-footer-action-list'>
              <EleActionList mode={['right', 'small']} list={actionList} />
            </View>
          )}
        </View>
      )}
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
