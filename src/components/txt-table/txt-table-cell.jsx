import React from 'react'
import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import _ from 'lodash'
import { isH5 } from '@/utils/index'

import './styles.scss'

export default function TxtTableCell({ maxTitleWidth = 4, title = '', value = '', valueClassName }) {
  // 宽度[2,5]
  const width = _.max([2, _.min([5, maxTitleWidth])])
  const titleClassName = classNames('info-row-cell-title', {
    small: title.length >= 6,
    [`width${width}`]: !isH5(),
  })
  return (
    <View className='info-row-cell'>
      <Text className={titleClassName}>{title}</Text>
      <Text className={valueClassName}>{value}</Text>
    </View>
  )
}
