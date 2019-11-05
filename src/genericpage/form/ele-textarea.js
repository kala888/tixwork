import Taro from '@tarojs/taro'
import { AtTextarea } from 'taro-ui'
import { Label, View } from '@tarojs/components'

import './ele-form.scss'
import EleHelper from '../ele-helper'

export default class EleTextarea extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    title: '',
    placeholder: null,
    maxLength: 2000,
    className: null,
    customStyle: {},
    height: null,
  }

  state = {
    value: '',
  }

  handleChange = (event) => {
    const { value } = event.target
    const { name, formKey } = this.props
    this.setState(
      {
        value,
      },
      () =>
        Taro.eventCenter.trigger('form-value-changed', {
          name,
          value,
          formKey,
        })
    )
  }

  render() {
    const { title, placeholder, maxLength, className, height, customStyle } = this.props
    const rootClass = EleHelper.classNames('ele-textarea', className)
    return (
      <View className={rootClass} style={customStyle}>
        <Label className='label-text'>{title}</Label>
        <View className='ele-textarea-container'>
          <AtTextarea
            placeholder={placeholder}
            value={this.state.value}
            maxLength={maxLength}
            height={height}
            onChange={this.handleChange}
          />
        </View>
      </View>
    )
  }
}
