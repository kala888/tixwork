import React from 'react'
import NavigationService from '@/nice-router/navigation.service'
import { Text } from '@tarojs/components'
import classNames from 'classnames'

function EleText(props) {
  const { text, action, customStyle, className } = props
  const onClick = () => NavigationService.view(action)

  const rootClass = classNames('ele-text', className)
  return (
    <Text className={rootClass} style={customStyle} onClick={onClick}>
      {text}
    </Text>
  )
}

EleText.defaultProps = {
  text: '',
  action: null,
  customStyle: {},
}

export default EleText
