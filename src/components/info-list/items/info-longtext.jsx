import React from 'react'
import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import { useVisible } from '@/service/use.service'

import _ from 'lodash'
import './styles.scss'

function InfoLongText({ value = '', maxLength = 200, className, mode = [], useFold = true }) {
  const theValue = _.isObject(value) ? JSON.stringify(value) : value
  const { visible, toggle } = useVisible(false)

  let showFoldAction = false
  if (useFold && value.length > maxLength) {
    showFoldAction = true
  }

  const rootClass = classNames('info-longtext', className, mode, {
    'info-longtext--fold': showFoldAction && !visible,
  })

  return (
    <View className={rootClass}>
      <Text className='info-longtext-value'>{theValue}</Text>
      {showFoldAction && (
        <Text className='info-longtext-action' onClick={toggle}>
          {visible ? '隐藏' : '展开'}
        </Text>
      )}
    </View>
  )
}

export default InfoLongText
