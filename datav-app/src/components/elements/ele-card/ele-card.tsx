import StatusFlag from '@/components/elements/ele-card/status-flag'
import NavigationService from '@/nice-router/navigation-service'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import ServerImage from '@/server-image/server-image'

import { ActionListLike, EleObject, ImageLike } from '@/nice-router/nice-router-types'
import { Text, View } from 'react-native'
import React from 'react'
import CardInfoTable from '@/components/elements/ele-table/card-info-table'
import EleActionList from '@/components/elements/ele-action-list'
import { getStyle } from '@/components/elements/ele-card/styles'


type EleCardLevel = 'default' | 'normal' | 'primary' | 'warn' | 'danger';

export type EleCardMode =
  | 'horizontal'
  | 'vertical'
  | 'vertical-small'
  | 'vertical-normal'
  | 'circle'
  | 'large'
  | 'small'
  | 'as-text'
  | 'avatar';

export type EleCardProps = {
  headerTitle?: string;
  headerBrief?: string;
  status?: string;
  flag?: string;
  level?: EleCardLevel;
  infoList?: any[];
  mode?: EleCardMode | EleCardMode[];
  onClick?: Function;
} & ImageLike &
  EleObject &
  ActionListLike;


/*
 * Copyright(c) 2020 nice-router
 *    Date: 2020/5/9 下午4:48
 *    Author: Kala
 */

//mode=small,large
function EleCard(props: EleCardProps) {
  const {
    headerTitle,
    headerBrief,
    title,
    brief,
    imageUrl,
    status,
    flag,
    level = '',
    actionList,
    infoList = [],
    onClick,
  } = props
  const { mode = [] } = props
  const flagSize = mode.includes('small') ? 'small' : 'normal'
  const hasImage = isNotEmpty(imageUrl)
  const hasFlag = !hasImage && isNotEmpty(flag)
  if (!hasImage && Array.isArray(mode)) {
    mode.push('as-text')
    // @ts-ignore
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

  const hasHeader = isNotEmpty(headerTitle) || isNotEmpty(headerBrief)
  const hasFooter = isNotEmpty(actionList) || isNotEmpty(infoList)


  return (
    <View style={getStyle('container', mode)}>
      <StatusFlag title={status} size={flagSize} />
      {hasHeader && (
        <View style={getStyle('header', mode)}>
          <Text numberOfLines={1} style={getStyle('headerTitle', mode)}>{headerTitle}</Text>
          <Text numberOfLines={1} style={getStyle('headerBrief', mode)}>{headerBrief}</Text>
        </View>
      )}

      <View style={getStyle('content', mode)}>

        {(hasImage || hasFlag) && (
          <View style={getStyle('cover', mode)} onClick={handleClick}>
            {hasImage ? (
              <ServerImage style={getStyle('coverImage', mode)} src={imageUrl} />
            ) : (
              <View style={getStyle('coverText', mode)}>
                <Text style={getStyle('coverTextContent', mode)}>{flag}</Text>
              </View>
            )}
          </View>
        )}

        <View style={getStyle('info', mode)}>
          <Text numberOfLines={1} style={getStyle('infoTitle', mode)}>{title}</Text>
          <Text numberOfLines={3} style={getStyle('infoBrief', mode)}>{brief}</Text>
        </View>
      </View>
      {hasFooter && (
        <View style={getStyle('footer', mode)}>
          {isNotEmpty(infoList) && <CardInfoTable data={infoList}/>}
          {isNotEmpty(actionList) && <EleActionList mode={['right', 'small']} items={actionList} />}
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

