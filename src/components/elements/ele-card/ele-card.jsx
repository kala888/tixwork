/*
 * Copyright(c) 2020 nice-router
 *    Date: 2020/5/9 下午4:48
 *    Author: Kala
 */

import { Block, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import ServerImage from '@/server-image/server-image'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import NavigationService from '@/nice-router/navigation.service'
import EleActionList from '@/components/elements/ele-action-list'
import StatusFlag from '@/listof/status-flag'
import './styles.scss'

//mode=small,large
function EleCard(props) {
  const {
    title,
    brief,
    imageUrl,
    status,
    flag,
    level,
    actionList = [
      { id: 1, title: '提交' },
      { id: 1, title: '收藏' },
    ],
    customized = false,
  } = props
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
            <ServerImage my-class='ele-card-cover-image' src={imageUrl} size='middle' />
          ) : (
            <Text className='ele-card-cover-txt'>{flag}</Text>
          )}
        </View>

        <View className='ele-card-info'>
          {props.children}
          {!customized && (
            <Block>
              <Text className='ele-card-info-title'>{title}</Text>
              <Text className='ele-card-info-brief'>{brief}</Text>
              {actionList.length > 0 && (
                <View className='card-action-list'>
                  <EleActionList list={actionList} />
                </View>
              )}
            </Block>
          )}
        </View>
      </View>
    </View>
  )
}

export default EleCard
