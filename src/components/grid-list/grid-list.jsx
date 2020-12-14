import React from 'react'
import { Image, Text, View } from '@tarojs/components'
import _ from 'lodash'
import classNames from 'classnames'
import { getExtMode, isEmpty, isNotEmpty } from '@/nice-router/nice-router-util'
import { getGroupListByColumn } from '@/utils/index'
import NavigationService from '@/nice-router/navigation-service'
import './grid-list.scss'

/**
 * 参考 taro-ui的grid写了写了一个
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function GridList(props) {
  const { items = [], columnNum = 3, onClick, className } = props
  if (isEmpty(items)) {
    return null
  }

  const groupList = getGroupListByColumn(items, columnNum)
  const handleClick = (item, index, row) => {
    if (_.isFunction(onClick)) {
      onClick(item, row * columnNum + index)
      return
    }
    NavigationService.view(item)
  }

  const rootClass = classNames('grid-list', className)

  return (
    <View className={rootClass}>
      {groupList.map((row) => {
        const { list } = row
        return (
          <View key={`row-${row.id}`} className='grid-list-row'>
            {list.map((item, idx) => {
              const { disabled, imageUrl, title = '', brief = '', icon = '' } = item

              const bodyClass = getExtMode({
                last: idx === columnNum - 1,
                active: !disabled,
                disabled: disabled,
              }).classNames('grid-list-item')

              const itemStyle = { flex: `0 0 ${100 / columnNum}%` }
              const actionTitle = `${title}${isNotEmpty(brief) ? '\n' + brief : ''}`

              return (
                <View
                  key={`item-${item.id}`}
                  className={bodyClass}
                  style={itemStyle}
                  onClick={handleClick.bind(this, item)}
                >
                  <View className='grid-list-item_icon'>
                    {isNotEmpty(imageUrl) ? (
                      <Image className='grid-list-item_icon-image' src={imageUrl} mode='scaleToFill' />
                    ) : (
                      <Text className={`iconfont iconfont-${icon}`} />
                    )}
                  </View>
                  <Text className='grid-list-item_title'>{actionTitle}</Text>
                </View>
              )
            })}
          </View>
        )
      })}
    </View>
  )
}
