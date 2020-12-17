import React from 'react'
import { getExtMode, isEmpty, noop } from '@/nice-router/nice-router-util'
import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import './styles.scss'

function ActionField(props) {
  const { value, placeholder, disabled, onClick, className } = props
  const handleClick = () => {
    if (!disabled) {
      onClick()
    }
  }

  const showAsPlaceholder = isEmpty(value)
  const contentClass = getExtMode({
    placeholder: showAsPlaceholder,
    disabled,
  }).classNames('action-field-content')
  const content = showAsPlaceholder ? placeholder : value
  const rootClass = classNames('action-field', className)
  return (
    <View className={rootClass}>
      <Text className={contentClass} onClick={handleClick}>
        {content}
      </Text>
      {!disabled && props.children}
    </View>
  )
}

ActionField.defaultProps = {
  disabled: false,
  onClick: noop,
}
export default ActionField
