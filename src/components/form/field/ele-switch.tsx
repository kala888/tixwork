import React from 'react'
import { toBoolean } from '@/nice-router/nice-router-util'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { AtSwitch } from 'taro-ui'

// candidateValues 就是 options
// candidateValues = [{
//   id: '11',
//   title: '男',
//   value: 'true',
// }, {
//   id: '22',
//   title: '女',
//   value: 'false',
// }]
function EleSwitch(props) {
  const { value = false, candidateValues = [], disabled, ...others } = props
  const checked = toBoolean(value)
  const selected = candidateValues.find((it) => toBoolean(it.value) === checked)
  const title = selected ? selected.title : ''
  const switchClass = classNames({
    'ele-switch-disabled': disabled,
  })
  return (
    <View className='ele-switch'>
      <AtSwitch
        className={switchClass}
        disabled={disabled}
        {...others}
        border={false}
        checked={checked}
        title={title}
      />
    </View>
  )
}

export default EleSwitch
