import { Text, View } from '@tarojs/components'
import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import './ele-table.scss'

export default function EleTableCell(props) {
  const { className, title, colspan = 1, mode = [] } = props
  const modeClass = (_.isString(mode) ? [mode] : mode).map((it) => `ele-table-cell--${it}`)
  const rootClass = classNames('ele-table-cell', className, modeClass)

  return (
    <View className={rootClass} style={{ flex: colspan }}>
      <Text className='ele-table-cell-text'>{title}</Text>
      {props.children}
    </View>
  )
}
