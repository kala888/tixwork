import React from 'react'
import { Text, View } from '@tarojs/components'
import classNames from 'classnames'

import './styles.scss'

export default function TxtTableCell({ title = '', value = '', valueClassName }) {
  const titleClassName = classNames('info-row-cell-title', {
    small: title.length >= 6,
  })
  return (
    <View className='info-row-cell'>
      <Text className={titleClassName}>{title}</Text>
      <Text className={valueClassName}>{value}</Text>
    </View>
  )
}
