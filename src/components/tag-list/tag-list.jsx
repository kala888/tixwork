import React, { useEffect, useState } from 'react'
import { Text, View } from '@tarojs/components'
import _ from 'lodash'
import { getExtMode, noop } from '@/nice-router/nice-router-util'
import './tag-list.scss'

export default function TagList(props) {
  const [tagList, setTagList] = useState([])
  const { onItemClick = noop, onChange = noop, multiple = false, mode = 'rect', disabled } = props

  useEffect(() => {
    // console.log('set---tag-list-items', items, tagList, tagList !== items)
    setTagList(props.items || [])
  }, [props])

  const handleClick = (item) => {
    if (disabled) {
      return
    }

    const theItem = {
      ...item,
      selected: !item.selected,
    }
    const result = _.clone(tagList).map((it) => {
      if (it.id === item.id) {
        return theItem
      }
      return multiple ? it : { ...it, selected: false }
    })

    onItemClick(theItem)
    onChange(result)
    setTagList(result)
  }

  return (
    <View>
      <View className='tag-list'>
        {tagList.map((it, idx) => {
          const tag = _.isString(it) ? { title: it, id: idx } : it
          const { title, disabled, hidden, selected } = tag
          const itemClass = getExtMode({ hidden, disabled, selected }, mode).classNames('tag-list-item')
          const key = `tag-item-${tag.id}-${title}-${it.value}`
          return (
            <View key={key} className={itemClass} onClick={handleClick.bind(null, it)}>
              <Text>{title}</Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}
