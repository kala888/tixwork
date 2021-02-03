import React from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import './ele-badge.scss'

export default function EleBadge(props) {
  const { dot, value = '', maxValue = 99, className } = props
  const theValue = value > maxValue ? `${maxValue}+` : `${value}`

  return (
    <View className={classNames('ele-badge', className)}>
      {props.children}
      {dot ? <View className='ele-badge-dot' /> : theValue !== '' && <View className='ele-badge-num'>{theValue}</View>}
    </View>
  )
}
