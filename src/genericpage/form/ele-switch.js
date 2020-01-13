import Taro from '@tarojs/taro'
import { Label, Switch, View } from '@tarojs/components'
import './ele-form.scss'
import EleHelper from '../ele-helper'

export default class EleSwitch extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    id: null,
    name: '',
    title: '',
    color: null,
    customStyle: {},
    className: null,
  }

  state = {
    value: true,
  }

  handleChange = (e) => {
    const { name, formKey } = this.props
    const { value } = e.detail
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
    const { title, color, className, customStyle } = this.props

    const rootClass = EleHelper.classNames('ele-switch', className)
    return (
      <View className={rootClass} style={customStyle}>
        <Label className='label-text'>{title}</Label>
        <Switch color={color} checked={this.state.value} onChange={this.handleChange} />
      </View>
    )
  }
}
