import Taro from '@tarojs/taro'
import { AtActionSheet, AtActionSheetItem, AtCheckbox, AtRadio } from 'taro-ui'
import ActionField from './action-field'
import { isEmpty } from '@/nice-router/nice-router-util'

export default class ElePopupSelect extends Taro.PureComponent {
  static defaultProps = {
    multiple: false,
    value: [],
    candidateValues: [],
  }

  state = {
    visible: false,
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
