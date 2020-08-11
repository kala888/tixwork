import React from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import './styles.scss'
import EleActionList from './ele-action-list'

function EleFabActionList({ actionList, className }) {
  const rootClass = classNames('ele-fab-action-list', className)

  return (
    isNotEmpty(actionList) && (
      <View className={rootClass}>
        <View>
          <EleActionList list={actionList} />
        </View>
      </View>
    )
  )
}

export default EleFabActionList
