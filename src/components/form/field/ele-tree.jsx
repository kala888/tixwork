import { View } from '@tarojs/components'
import { AtActionSheet, AtIcon } from 'taro-ui'
import { useVisible } from '@/service/use.service'

import Tree from './tree/tree'
import ActionField from './action-field'
import './styles.scss'

function findValueFromTheTree(value, treeItem = {}) {
  const { value: currentValue, title: currentTitle, nodes = [] } = treeItem
  if (currentValue === value) {
    return {
      currentValue: currentValue,
      displayValue: currentTitle,
    }
  }
  for (let i = 0; i < nodes.length; i += 1) {
    const result = findValueFromTheTree(value, nodes[i])
    if (result) {
      return result
    }
  }
}

function EleTree(props) {
  const { visible, show, close, toggle } = useVisible(false)

  const { value, title, root, onChange, disabled, placeholder, label } = props

  const getValue = () => {
    const result = findValueFromTheTree(value, root)
    if (result) {
      return result
    }
    return {
      currentValue: value,
      displayValue: value ? title : '',
    }
  }

  const { currentValue, displayValue } = getValue()
  return (
    <ActionField onClick={show} disabled={disabled} value={displayValue} placeholder={placeholder}>
      <View className='action-field-picker' onClick={toggle}>
        {visible ? (
          <AtIcon className='action-field-picker-icon' value='chevron-down' size={20} />
        ) : (
          <AtIcon className='action-field-picker-icon' value='chevron-right' size={20} />
        )}
      </View>

      <AtActionSheet title={label} onClose={close} isOpened={visible} cancelText='确认'>
        <View style='height:80vh'>
          <Tree {...root} onChange={onChange} selected={currentValue} />
        </View>
      </AtActionSheet>
    </ActionField>
  )
}

EleTree.options = {
  addGlobalClass: true,
}
EleTree.defaultProps = {
  root: {},
}

export default EleTree
