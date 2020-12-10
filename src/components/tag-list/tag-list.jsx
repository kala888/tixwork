import React, { useState } from 'react'
import { View } from '@tarojs/components'
import ActionUtil from '@/nice-router/action-util'
import _ from 'lodash'
import { getExtMode, isEmpty, isNotEmpty } from '@/nice-router/nice-router-util'
import './styles.scss'

export default function TagList(props) {
  const [selected, setSelected] = useState({})

  const { value, items, onClick, mode = 'rect' } = props
  const list = value || items || []
  if (isEmpty(list)) {
    return null
  }

  const clickable = ActionUtil.isActionLike(props)
  const handleClick = (item) => {
    setSelected(item)
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

        const isSelected = isNotEmpty(selected) ? selected.code === it.code : it.selected

        const itemClass = getExtMode(
          {
            hidden: hide,
            disabled,
            selected: isSelected,
          },
          mode
        ).classNames('tag-list-item', { clickable })
        return (
          <View key={id} className={itemClass} onClick={handleClick.bind(null, it)}>
            {title}
          </View>
        )
      })}
    </View>
  )
}
