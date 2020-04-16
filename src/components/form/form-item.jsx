import { View } from '@tarojs/components'
import classNames from 'classnames'
import isNil from 'lodash/isNil'
import { isNotEmpty, noop } from '@/nice-router/nice-router-util'

import FormUtil from '../form/form-util'
import FlexField from './field/flex-field'
import ItemLabel from './item-label'
import ItemWrapper from './item-wrapper'
import './styles.scss'

function FormItem(props) {
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
    tips,
    layout,
    customized,
    onChange,
  } = props

  const handleChange = (v, e) => {
    // console.log('item event maybe you needed', e)
    let fieldValue = FormUtil.getValue(v)
    onChange(name, fieldValue)
  }

  const onClear = () => {
    onChange(name, null)
  }

  const showRequiredIcon = () => {
    if (showRequired) {
      return isNil(required) ? !!rules.find((rule) => rule.required) : required
    }
    return false
  }
  // const layout = field.layout || this.props.layout || ''
  const hasError = isNotEmpty(errors)

  const rootClass = classNames('form-item', {
    'form-item-error': hasError,
    [`form-item-${layout}`]: true,
  })

  const isRequired = showRequiredIcon()

  return (
    <ItemWrapper
      clear={clear}
      value={value}
      errors={errors}
      bordered={bordered}
      inline={inline}
      disabled={disabled}
      onClear={onClear}
    >
      <View className={rootClass}>
        <ItemLabel tips={tips} layout={layout} required={isRequired}>
          {label}
        </ItemLabel>
        <View className='form-item-flex-field'>
          {props.children}
          {!customized && <FlexField {...props} onChange={handleChange} />}
        </View>
      </View>
    </ItemWrapper>
  )
}

FormItem.options = {
  addGlobalClass: true,
}

FormItem.defaultProps = {
  errors: [],
  onChange: noop,
  customized: false,
  layout: 'horizontal', //'vertical','float'
  required: null,
  rules: [],
  showRequired: true,
}

export default FormItem
