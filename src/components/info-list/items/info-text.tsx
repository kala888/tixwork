import React from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import _ from 'lodash'

import './styles.scss'

function InfoText({ value, className, mode = [] }) {
  const rootClass = classNames('info-text', className, mode)
  const theValue = _.isObject(value) ? JSON.stringify(value) : value
  return <View className={rootClass}>{theValue}</View>
}

export default InfoText
