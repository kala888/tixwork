import Taro from '@tarojs/taro'
import { AtIcon } from 'taro-ui'
import isArray from 'lodash/isArray'
import { Label, Picker, View } from '@tarojs/components'
import m_ from '@/utils/mini-lodash'

import './ele-form.scss'
import EleHelper from '../ele-helper'

export default class ElePicker extends Taro.PureComponent {
  static defaultProps = {
    title: '',
    brief: '请选择',
    mode: 'date',
    displayMode: 'right-brief',
    range: null,
    displayProperty: 'name',
    valueProperty: 'id',
    customStyle: {},
    className: null,
    name: '',
    displayValue: '',
  }

  state = {
    innerDisplayValue: null,
  }

  componentDidMount() {
    const { displayValue } = this.props
    this.setState({
      innerDisplayValue: displayValue,
    })
  }

  handleChange = (e) => {
    const { name, range, formKey, displayProperty, valueProperty, onChange } = this.props
    const { value } = e.detail
    let selected = value
    let innerDisplayValue = value
    let selectedValue = null

    if (isArray(value)) {
      selected = value.map((it, idx) => {
        if (range) {
          return range[idx][it] || ''
        }
        return it
      })
      innerDisplayValue = m_.trim(selected.map((it) => it[displayProperty] || it).join('-'), '-')
    } else if (range) {
      selected = range[value]
      innerDisplayValue = selected[displayProperty]
      selectedValue = selected[valueProperty]
    }

    if (onChange) {
      onChange(selected)
    }

    this.setState(
      {
        innerDisplayValue,
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
    const { innerDisplayValue } = this.state
    const rootClass = EleHelper.classNames('ele-picker', className)

    console.log('innerDisplayValue', innerDisplayValue)

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
            {innerDisplayValue ? (
              <View className='ele-picker-right-value'>{innerDisplayValue}</View>
            ) : (
              <View className='ele-picker-right-brief'>{brief}</View>
            )}
            <View className='ele-picker-right-icon'>
              <AtIcon size={12} value='chevron-right' />
            </View>
          </View>
        </View>
      </Picker>
    )
  }
}
