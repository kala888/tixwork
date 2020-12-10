import React from 'react'
import _ from 'lodash'
import { View } from '@tarojs/components'
import { isH5 } from '@/utils/index'
import { getExtMode, isEmpty } from '@/nice-router/nice-router-util'
import EleButton from '../ele-button'
import './styles.scss'

const LEVEL_LIST = ['primary', 'warn', 'danger', 'normal', 'info', 'secondary']

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
        let level = null

        if (_.includes(mode, 'colorful')) {
          level = LEVEL_LIST[idx % LEVEL_LIST.length]
        }

        return (
          <View key={key} className='ele-action-list-item'>
            <EleButton {...it} mode={level} customStyle={{ ...actionStyle }} className='ele-action-list-btn' />
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
