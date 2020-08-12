import React from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import EleButton from '../ele-button'
import './styles.scss'

function EleActionList({ list, mode = ['right'], className }) {
  const rootClass = classNames('ele-action-list', className, mode)

  return (
    <View className={rootClass}>
      {list.map((it) => {
        const { customStyle: actionStyle = {} } = it
        const key = `btn_${it.id}_${it.code}_${it.title}`
        return (
          <View key={key} className='ele-action-list-item'>
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
