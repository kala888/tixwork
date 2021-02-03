import React from 'react'
import { getExtMode, noop } from '@/nice-router/nice-router-util'
import { Text } from '@tarojs/components'
import _ from 'lodash'
import './ele-tag.scss'

export default function EleTag(props) {
  const { hidden, disabled, selected, mode, className, title, onClick = noop, size = 'normal' } = props
  const clickable = !disabled && _.isFunction(onClick)
  const rootClass = getExtMode({ disabled, selected, [size]: true }, mode).classNames('ele-tag', className, {
    hidden,
    clickable,
  })
  const handleClick = () => {
    if (clickable) {
      onClick(props)
    }
  }

  return (
    <Text className={rootClass} onClick={handleClick}>
      {props.children || title}
    </Text>
  )
}
