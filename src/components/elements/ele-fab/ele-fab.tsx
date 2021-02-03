import React from 'react'
import EleButton from '@/components/elements/ele-button'
import { View } from '@tarojs/components'
import { getExtMode } from '@/nice-router/nice-router-util'
import './ele-fab.scss'

export default function EleFab(props) {
  const { mode = 'round', className, ...others } = props
  const rootClass = getExtMode(mode).classNames('ele-fab', className)
  return (
    <View className={rootClass}>
      <EleButton mode='ghost' {...others} />
    </View>
  )
}
