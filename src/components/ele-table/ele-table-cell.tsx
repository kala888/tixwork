import { Text, View } from '@tarojs/components'
import React from 'react'
import { getExtMode, isNotEmpty } from '@/nice-router/nice-router-util'
import './ele-table.scss'

export default function EleTableCell(props) {
  const { className, title, colspan = 1, mode = [] } = props

  const rootClass = getExtMode(mode).classNames('ele-table-cell', className)

  return (
    <View className={rootClass} style={{ flex: colspan }}>
      {isNotEmpty(title) && <Text className='ele-table-cell-text'>{title}</Text>}
      {props.children}
    </View>
  )
}
