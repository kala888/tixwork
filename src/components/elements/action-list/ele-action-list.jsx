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

function EleActionList({ list = [], mode = ['right'], className }) {
  if (isEmpty(list)) {
    return null
  }
  const rootClass = getExtMode(mode, {
    h5: isH5(),
  }).classNames('ele-action-list', className)

  return (
    <View className={rootClass}>
      {list.map((it, idx) => {
        const { customStyle: actionStyle = {} } = it
        const key = `btn_${it.id}_${it.code}_${it.title}`
        const mixColorClass = _.get(MixClass, `${list.length - 1}.${idx}`)
        const itemClass = getExtMode(mixColorClass).classNames('ele-action-list-item')
        return (
          <View key={key} className={itemClass}>
            <EleButton {...it} customStyle={{ ...actionStyle }} className='ele-action-list-btn' />
          </View>
        )
      })}
    </View>
  )
}

EleActionList.defaultProps = {
  list: [],
  className: null,
  customStyle: {},
}

export default EleActionList
