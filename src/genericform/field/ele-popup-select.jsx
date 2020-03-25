import Taro from '@tarojs/taro'
import { AtActionSheet, AtActionSheetItem, AtCheckbox, AtIcon, AtRadio } from 'taro-ui'
import { View } from '@tarojs/components'
import { isEmpty } from '@/nice-router/nice-router-util'
import ActionField from './action-field'

import './styles.scss'

export default class ElePopupSelect extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    multiple: false,
    value: [],
    candidateValues: [],
  }

  state = {
    visible: false,
  }

  handleToggle = () => {
    this.setState((preState) => ({
      visible: !preState.visible,
    }))
  }

  show = () => {
    this.setState({
      visible: true,
    })
  }

  close = () => {
    this.setState({
      visible: false,
    })
  }

  handleChange = (value) => {
    const { onChange, multiple } = this.props
    onChange(value)
    if (!multiple) {
      this.close()
    }
  }

  render() {
    const { placeholder, label, value, candidateValues, multiple } = this.props
    const { visible } = this.state

    const currentValue = isEmpty(value) ? (multiple ? [] : '') : value

    const displayValue = candidateValues
      .filter((it) => currentValue.includes(it.value))
      .map((it) => it.title)
      .join('、')

    const options = candidateValues.map((it) => ({
      ...it,
      label: it.title,
    }))

    const cancelText = multiple ? '确定' : '取消'

    return (
      <ActionField onClick={this.show} value={displayValue} placeholder={placeholder}>
        <View className='action-field-picker' onClick={this.handleToggle}>
          {visible ? (
            <AtIcon className='action-field-picker-icon' value='chevron-down' size={20} />
          ) : (
            <AtIcon className='action-field-picker-icon' value='chevron-right' size={20} />
          )}
        </View>
        <AtActionSheet title={label} onClose={this.close} isOpened={visible} cancelText={cancelText}>
          <AtActionSheetItem>
            {multiple ? (
              <AtCheckbox options={options} selectedList={currentValue} onChange={this.handleChange} />
            ) : (
              <AtRadio options={options} value={currentValue} onClick={this.handleChange} />
            )}
          </AtActionSheetItem>
        </AtActionSheet>
      </ActionField>
    )
  }
}
