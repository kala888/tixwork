import Taro from '@tarojs/taro'
import { Label, View } from '@tarojs/components'
import NavigationService from '@/nice-router/navigation.service'
import { AtIcon } from 'taro-ui'
import '../styles.scss'

import EleHelper from '../ele-helper'

class EleUserPicker extends Taro.Component {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    title: '',
    brief: '请选择',
    className: null,
    customStyle: {},
  }

  state = {
    displayValue: '',
  }

  handlePickerClick = async () => {
    // Taro.eventCenter.on("user-picked-callback",this.onChoose)
    const selected = await NavigationService.navigate('/components/genericpage/pages/user-picker-page', {
      projectId: 111222,
    })
    if (selected) {
      const { name, formKey } = this.props

      this.setState(
        {
          displayValue: selected.name,
        },
        () =>
          Taro.eventCenter.trigger('form-value-changed', {
            name,
            value: selected,
            formKey,
          })
      )
    }
  }

  render() {
    const { title, brief, className, customStyle } = this.props

    const value = this.state.displayValue
    const rootClass = EleHelper.classNames('ele-picker', 'ele-user-picker', className)

    return (
      <View className={rootClass} style={customStyle} onClick={this.handlePickerClick}>
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
    )
  }
}

export default EleUserPicker
