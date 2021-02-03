import React from 'react'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import _ from 'lodash'

import './styles.scss'

const LEVEL = ['default', 'primary', 'normal', 'warn', 'danger']

function getLevel({ level }) {
  return level || _.sample(LEVEL) // sample for demo
}

function InfoStatus(props) {
  const { value = {} } = props
  const { name, code } = value
  const level = getLevel(value)
  const statusIconClass = classNames('info-status-icon', { [level]: isNotEmpty(level) })

  return (
    <View className='info-status'>
      <View className={statusIconClass} />
      <Text>
        {name} ({code})
      </Text>
    </View>
  )
}

export default InfoStatus
