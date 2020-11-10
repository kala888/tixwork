import React from 'react'
import { View } from '@tarojs/components'
import ActionUtil from '@/nice-router/action-util'
import classNames from 'classnames'
import _ from 'lodash'
import { isEmpty } from '@/nice-router/nice-router-util'
import './styles.scss'

export default function TagList(props) {
  const { value, items, onClick, mode = 'rect' } = props
  const list = value || items || []
  if (isEmpty(list)) {
    return null
  }

  const clickable = ActionUtil.isActionLike(props)
  const handleClick = (item) => {
    if (_.isFunction(onClick)) {
      onClick(item)
    }
  }

  // list.push({ id: `hide-${1}`, hide: true })

  return (
    <View className='tag-list'>
      {list.map((it, idx) => {
        const tag = _.isString(it) ? { title: it, id: idx } : it
        const { id, title, disabled, hide } = tag
        const itemClass = classNames('tag-list-item', {
          'tag-list-item--disabled': disabled,
          clickable,
          [`tag-list-item--${mode}`]: true,
          'tag-list-item--hidden': hide,
        })
        return (
          <View key={id} className={itemClass} onClick={handleClick.bind(null, it)}>
            {title}
          </View>
        )
      })}
    </View>
  )
}
