import React from 'react'
import { View } from '@tarojs/components'
import { isH5 } from '@/utils/index'
import _ from 'lodash'
import { getExtMode, isEmpty } from '@/nice-router/nice-router-util'

import EleButton from '../ele-button'
import './styles.scss'

const MixClass = [
  ['mix0'],
  ['mix0', 'mix1'],
  ['mix0', 'mix05', 'mix1'],
  ['mix0', 'mix033', 'mix066', 'mix1'],
  ['mix0', 'mix025', 'mix05', 'mix075', 'mix1'],
]

function EleActionList(props) {
  const { list, items, actionList, mode = ['full'], className } = props
  const theActionList = list || items || actionList
  if (isEmpty(theActionList)) {
    return null
  }

  const rootClass = getExtMode(mode, { h5: isH5() }).classNames('ele-action-list', className)

  const stopTheEvent = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <View className={rootClass} onClick={stopTheEvent}>
      {theActionList.map((action, idx) => {
        const key = `btn_${action.id}_${action.code}_${action.title}`
        const mixColorClass = _.get(MixClass, `${list.length - 1}.${idx}`)
        const itemClass = getExtMode(mixColorClass).classNames('ele-action-list-item')
        return (
          <View key={key} className={itemClass}>
            <EleButton {...action} />
          </View>
        )
      })}
    </View>
  )
}

EleActionList.defaultProps = {
  customStyle: {},
}

export default EleActionList
