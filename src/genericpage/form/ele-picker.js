import Taro from '@tarojs/taro'
import { AtIcon } from 'taro-ui'
import { Label, Picker, View } from '@tarojs/components'

import './ele-form.scss'
import EleHelper from '../ele-helper'

export default class ElePicker extends Taro.PureComponent {
  static defaultProps = {
    title: '',
    brief: '请选择',
    mode: 'date',
    displayMode: 'right-brief',
    range: null,
    rangeKey: 'title',
    valueKey: 'value',
    customStyle: {},
    className: null,
  }

  state = {
    displayValue: '',
  }

  handleChange = (e) => {
    const { name, range, rangeKey, formKey, valueKey } = this.props
    const { value } = e.detail
    const selected = range ? range[value] : value
    const displayValue = selected[rangeKey] || selected

    this.setState(
      {
        displayValue,
      },
      () =>
        Taro.eventCenter.trigger('form-value-changed', {
          name,
          value: selected[valueKey] || selected,
          formKey,
        })
    )
  }

  render() {
    const { title, brief, mode, range, rangeKey, className, customStyle } = this.props

    const value = this.state.displayValue
    const rootClass = EleHelper.classNames('ele-picker', className)

    return (
      <Picker mode={mode} onChange={this.handleChange} range={range} rangeKey={rangeKey}>
        <View className={rootClass} style={customStyle}>
          <Label className='label-text ele-picker-left'>{title}</Label>
          <View className='ele-picker-right'>
            {value ? (
              <View className='ele-picker-right-value'>{value}</View>
            ) : (
              <View className='ele-picker-right-brief'>{brief}</View>
            )}
            <AtIcon size={12} value='chevron-right' />
          </View>
        </View>
      </Picker>
    )
  }
}
