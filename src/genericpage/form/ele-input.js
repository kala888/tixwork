import Taro from '@tarojs/taro'
import { AtInput } from 'taro-ui'
import './ele-form.scss'
import EleHelper from '../ele-helper'

// type: text, password, number, idcard, digit, phone
// type: money
// className: "", noLabel, noBorder, underLine

export default class EleInput extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    name: '',
    title: '',
    type: 'text',
    placeholder: '',
    className: null,
    customStyle: {},
    maxLength: 2000,
    defaultValue: null,
    focus: null,
  }

  handleChange = (value) => {
    const { name, formKey, onChange } = this.props
    if (onChange) {
      onChange(value)
      // return
    }
    Taro.eventCenter.trigger('form-value-changed', {
      name,
      value,
      formKey,
    })
  }

  render() {
    const { name, title, type, placeholder, className, maxLength, focus, defaultValue, customStyle } = this.props
    const inputType = type === 'money' ? 'digit' : type
    const rootClass = EleHelper.classNames('ele-input', className)
    return (
      <AtInput
        name={name}
        onChange={this.handleChange}
        title={title}
        type={inputType}
        placeholder={placeholder}
        border={false}
        className={rootClass}
        placeholderStyle='font-size:24rpx;color:#999'
        maxLength={maxLength}
        value={defaultValue}
        focus={focus}
        customStyle={customStyle}
      />
    )
  }
}
