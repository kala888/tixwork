import { AtActionSheet, AtActionSheetItem, AtCheckbox, AtIcon, AtRadio } from 'taro-ui'
import { useVisible } from '@/service/use.service'
import { View } from '@tarojs/components'
import isString from 'lodash/isString'
import { isEmpty } from '@/nice-router/nice-router-util'

import ActionField from './action-field'
import './styles.scss'

function ElePopupSelect(props) {
  const { visible, show, close, toggle } = useVisible(false)

  const { onChange, multiple, value, placeholder, label, candidateValues, disabled } = props

  const handleChange = (v) => {
    onChange(v)
    if (!multiple) {
      close()
    }
  }

  const getValue = () => {
    let currentValue = value
    if (isEmpty(value)) {
      currentValue = multiple ? [] : ''
    }
    if (multiple && isString(value)) {
      currentValue = [value]
    }
    const displayValue = candidateValues
      .filter((it) => (multiple ? currentValue.includes(it.value) : currentValue === it.value))
      .map((it) => it.title)
      .join('、')

    return {
      currentValue,
      displayValue,
    }
  }

  const { currentValue, displayValue } = getValue()

  const options = candidateValues.map((it) => ({
    ...it,
    label: it.title,
  }))

  const cancelText = multiple ? '确定' : '取消'

  return (
    <ActionField onClick={show} disabled={disabled} value={displayValue} placeholder={placeholder}>
      <View className='action-field-picker' onClick={toggle}>
        {visible ? (
          <AtIcon className='action-field-picker-icon' value='chevron-down' size={20} />
        ) : (
          <AtIcon className='action-field-picker-icon' value='chevron-right' size={20} />
        )}
      </View>

      <AtActionSheet title={label} onClose={close} isOpened={visible} cancelText={cancelText}>
        <AtActionSheetItem>
          {multiple ? (
            <AtCheckbox options={options} selectedList={currentValue} onChange={handleChange} />
          ) : (
            <AtRadio options={options} value={currentValue} onClick={handleChange} />
          )}
        </AtActionSheetItem>
      </AtActionSheet>
    </ActionField>
  )
}

ElePopupSelect.options = {
  addGlobalClass: true,
}

ElePopupSelect.defaultProps = {
  multiple: false,
  value: [],
  candidateValues: [],
}

export default ElePopupSelect
