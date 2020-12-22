import React from 'react'
import { isEmpty } from '@/nice-router/nice-router-util'
import { useVisible } from '@/service/use-service'
import _ from 'lodash'
import { AtActionSheet, AtActionSheetItem, AtCheckbox, AtRadio } from 'taro-ui'

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
    if (multiple && _.isString(value)) {
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
    <ActionField
      onClick={show}
      disabled={disabled}
      value={displayValue}
      placeholder={placeholder}
      toggleStatus={visible}
    >
      <AtActionSheet title={label} onClose={close} isOpened={visible} cancelText={cancelText}>
        <AtActionSheetItem className='popup-view'>
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

ElePopupSelect.defaultProps = {
  multiple: false,
  value: [],
  candidateValues: [],
}

export default ElePopupSelect
