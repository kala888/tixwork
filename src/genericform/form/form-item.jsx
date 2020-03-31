import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { isNotEmpty, noop } from '@/nice-router/nice-router-util'
import classNames from 'classnames'
import isNil from 'lodash/isNil'
import FormUtil from '../form-util'
import FlexField from '../field/flex-field'
import ItemLabel from './item-label'
import ItemWrapper from './item-wrapper'
import './styles.scss'

export default class FormItem extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    errors: [],
    onChange: noop,
    customized: true,
    layout: 'horizontal', //'vertical','float'
    required: null,
    rules: [],
    showRequired: true,
  }

  handleChange = (value, event) => {
    console.log('item event maybe you needed', event)
    const { name, onChange } = this.props
    let fieldValue = FormUtil.getValue(value)
    onChange(name, fieldValue)
  }

  handleClear = () => {
    const { name, onChange } = this.props
    onChange(name, null)
  }

  showRequiredIcon = () => {
    const { required, rules, showRequired } = this.props
    if (showRequired) {
      return isNil(required) ? !!rules.find((rule) => rule.required) : required
    }
    return false
  }

  render() {
    const { clear, value, errors, bordered, inline, disabled, label, tips, layout, customized } = this.props

    // const layout = field.layout || this.props.layout || ''
    const hasError = isNotEmpty(errors)

    const rootClass = classNames('form-item', {
      'form-item-error': hasError,
      [`form-item-${layout}`]: true,
    })

    const isRequired = this.showRequiredIcon()

    return (
      <ItemWrapper
        clear={clear}
        value={value}
        errors={errors}
        bordered={bordered}
        inline={inline}
        disabled={disabled}
        onClear={this.handleClear}
      >
        <View className={rootClass}>
          <ItemLabel tips={tips} layout={layout} required={isRequired}>
            {label}
          </ItemLabel>
          <View className='form-item-flex-field'>
            {customized ? this.props.children : <FlexField {...this.props} onChange={this.handleChange} />}
          </View>
        </View>
      </ItemWrapper>
    )
  }
}
