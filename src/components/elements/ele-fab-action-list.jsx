import React from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import EleActionList from './ele-action-list'
import './styles.scss'

function EleFabActionList({ list, className }) {
  const rootClass = classNames('ele-fab-action-list', className)

  return (
    isNotEmpty(list) && (
      <View className={rootClass}>
        <View className='ele-fab-action-list-wrapper'>
          <EleActionList className={className} list={list} />
        </View>
      </View>
    )
  )
}

export default EleFabActionList
