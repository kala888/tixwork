import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtActionSheet, AtIcon } from 'taro-ui'
import ActionField from '@/genericform/field/action-field'
import Tree from '../field/tree/tree'

class EleTree extends Taro.PureComponent {
  static defaultProps = {
    root: {},
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

  findValueFromTheTree = (value, treeItem = {}) => {
    const { value: currentValue, title: currentTitle, nodes = [] } = treeItem
    if (currentValue === value) {
      return {
        currentValue: currentValue,
        displayValue: currentTitle,
      }
    }
    for (let i = 0; i < nodes.length; i += 1) {
      const result = this.findValueFromTheTree(value, nodes[i])
      if (result) {
        return result
      }
    }
  }
  getValue = () => {
    const { value, title, root } = this.props
    const result = this.findValueFromTheTree(value, root)
    if (result) {
      return result
    }
    console.log('valueddddd', this.props)
    return {
      currentValue: value,
      displayValue: value ? title : '',
    }
  }

  render() {
    const { root, onChange, disabled, placeholder, label } = this.props
    const { visible } = this.state
    const { currentValue, displayValue } = this.getValue()
    return (
      <ActionField onClick={this.show} disabled={disabled} value={displayValue} placeholder={placeholder}>
        <View className='action-field-picker' onClick={this.handleToggle}>
          {visible ? (
            <AtIcon className='action-field-picker-icon' value='chevron-down' size={20} />
          ) : (
            <AtIcon className='action-field-picker-icon' value='chevron-right' size={20} />
          )}
        </View>

        <AtActionSheet title={label} onClose={this.close} isOpened={visible} cancelText='确认'>
          <View style='height:80vh'>
            <Tree {...root} onChange={onChange} selected={currentValue} />
          </View>
        </AtActionSheet>
      </ActionField>
    )
  }
}

export default EleTree
