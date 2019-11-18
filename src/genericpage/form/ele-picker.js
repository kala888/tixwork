import Taro from '@tarojs/taro'
import { AtIcon } from 'taro-ui'
import isArray from 'lodash/isArray'
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
    displayProperty: 'title',
    valueProperty: 'value',
    customStyle: {},
    className: null,
    name: '',
  }

  state = {
    displayValue: null,
  }

  handleChange = (e) => {
    const { name, range, formKey, displayProperty, valueProperty } = this.props
    const { value } = e.detail
    let selected = value
    let displayValue = value
    let selectedValue = null

    if (isArray(value)) {
      selected = value.map((it, idx) => {
        if (range) {
          return range[idx][it]
        }
        return it
      })
      displayValue = selected.map((it) => it[displayProperty] || it).join('-')
    } else if (range) {
      selected = range[value]
      displayValue = selected[displayProperty]
      selectedValue = selected[valueProperty]
    }

    this.setState(
      {
        displayValue,
      },
      () =>
        Taro.eventCenter.trigger('form-value-changed', {
          name,
          value: selectedValue || selected,
          formKey,
        })
    )
  }

  render() {
    const { title, brief, mode, range, displayProperty, className, customStyle, onColumnChange } = this.props
    const { displayValue } = this.state
    const rootClass = EleHelper.classNames('ele-picker', className)

    return (
      <Picker
        mode={mode}
        onChange={this.handleChange}
        range={range}
        rangeKey={displayProperty}
        onColumnChange={onColumnChange}
      >
        <View className={rootClass} style={customStyle}>
          <Label className='label-text ele-picker-left'>{title}</Label>
          <View className='ele-picker-right'>
            {displayValue ? (
              <View className='ele-picker-right-value'>{displayValue}</View>
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
