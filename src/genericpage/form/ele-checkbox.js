import Taro from '@tarojs/taro'
import { AtCheckbox } from 'taro-ui'
import { Label, View } from '@tarojs/components'

import './ele-form.scss'
import EleHelper from '../ele-helper'

export default class EleCheckbox extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    title: '',
    options: [
      // { label: '多选项一', value: 'option1', checked: true, desc: '多选项描述' },
      // { label: '多选项二', value: 'option2' },
      // { label: '单选项三禁用', value: 'option3', desc: '多选项描述', disabled: true },
    ],
    className: null,
    customStyle: {},
  }

  state = {
    checkedList: ['option1'],
  }

  handleChange = (checkedList) => {
    const { name, formKey } = this.props
    this.setState(
      {
        checkedList,
      },
      () =>
        Taro.eventCenter.trigger('form-value-changed', {
          name,
          value: checkedList,
          formKey,
        })
    )
  }

  render() {
    const { title, options, className, customStyle } = this.props
    const rootClass = EleHelper.classNames('ele-checkbox', className)

    return (
      <View className={rootClass} style={customStyle}>
        <Label className='label-text'>{title}</Label>
        <View className='checkbox-group'>
          <AtCheckbox options={options} selectedList={this.state.checkedList} onChange={this.handleChange} />
        </View>
      </View>
    )
  }
}
