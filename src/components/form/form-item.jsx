import React from 'react'
import { getExtMode, isNotEmpty, noop } from '@/nice-router/nice-router-util'
import { View } from '@tarojs/components'
import _ from 'lodash'
import { useVisible } from '@/service/use-service'
import { AtToast } from 'taro-ui'

import FormItemTail from './form-item-tail'
import FormUtil from '../form/form-util'
import FlexField from './field/flex-field'
import FormItemLabel from './form-item-label'
import './form-item.scss'

function FormItem(props) {
  const { visible, show: showError, close: closeError } = useVisible(false)

  const {
    name,
    required,
    rules,
    showRequired,
    clear,
    value,
    errors,
    bordered,
    inline,
    disabled,
    label,
    title,
    tips,
    onChange,
  } = props

  const handleChange = (v, e) => {
    console.log('item event maybe you needed', e)
    let fieldValue = FormUtil.getValue(v)
    onChange(name, fieldValue)
  }

  const onClear = () => {
    onChange(name, null)
  }

  const showRequiredIcon = () => {
    if (showRequired) {
      return _.isNil(required) ? !!rules.find((rule) => rule.required) : required
    }
    return false
  }

  const hasError = isNotEmpty(errors)

  const layout = inline ? 'horizontal' : 'vertical'

  const rootClass = getExtMode({
    error: hasError,
    [layout]: true,
    bordered,
  }).classNames('form-item')

  const isRequired = showRequiredIcon()

  // 没有disabled，没有错误，有值，显示清理btn，就展示
  const showClear = !disabled && !hasError && clear && isNotEmpty(value)

  const theTail = <FormItemTail showClear={showClear} hasError={hasError} onClear={onClear} onShowError={showError} />

  return (
    <View className={rootClass}>
      <FormItemLabel tips={tips} layout={layout} required={isRequired} tail={layout === 'vertical' ? theTail : null}>
        {label || title}
      </FormItemLabel>

      <View className='form-item-field'>{props.children || <FlexField {...props} onChange={handleChange} />}</View>

      {layout === 'horizontal' && theTail}

      {hasError && <AtToast text={errors[0]} onClose={closeError} duration={3000} isOpened={visible} />}
    </View>
  )
}

FormItem.defaultProps = {
  name: '',
  clear: false,
  value: null,
  errors: [],
  onChange: noop,
  layout: 'horizontal', //'vertical','float'
  required: null,
  rules: [],
  showRequired: true,
  inline: true,
  bordered: true,
  disabled: false,
}

export default FormItem
