import Taro from '@tarojs/taro'
import { AtRadio } from 'taro-ui'
import { Label, View } from '@tarojs/components'

import './ele-form.scss'
import EleHelper from '../ele-helper'

export default class EleRadio extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    title: '',
    options: [
      // { label: '单选项一', value: 'option1', desc: '单选项描述' },
      // { label: '单选项二', value: 'option2' },
      // { label: '单选项三禁用', value: 'option3', desc: '单选项描述', disabled: true },
    ],
  }

  state = {
    value: true,
  }

  handleChange = (value) => {
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
    const { title, options, className, customStyle } = this.props

    const rootClass = EleHelper.classNames('ele-radio', className)
    return (
      <View className={rootClass} style={customStyle}>
        <Label className='label-text'>{title}</Label>
        <View className='radio-group'>
          <AtRadio options={options} value={this.state.value} onClick={this.handleChange} />
        </View>
      </View>
    )
  }
}
