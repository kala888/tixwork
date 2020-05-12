import React, { useState } from 'react'
import { isEmpty, noop } from '@/nice-router/nice-router-util'
import { useVisible } from '@/service/use.service'
import { formatTime, transToDate } from '@/utils/index'
import { Picker } from '@tarojs/components'
import { AtActionSheet, AtActionSheetItem, AtCalendar } from 'taro-ui'
import ActionField from './action-field'

function EleCalendar(props) {
  const [date, setDate] = useState('')
  const [showCalendar, setShowCalendar] = useState(true)
  const { visible, show: showPopup, close: closePopup } = useVisible(false)
  const { mode, onChange, placeholder, label, value, disabled } = props

  const show = () => {
    showPopup()
    setShowCalendar(true)
  }
  const close = () => {
    closePopup()
    setShowCalendar(false)
  }

  const handleDateSelected = (e) => {
    const { start: startDate } = e.value
    close()

    if (mode === 'date') {
      onChange(startDate)
      return
    }
    setDate(startDate)
  }

  const handleTimeChange = (e) => {
    const {
      detail: { value: time },
    } = e
    onChange(`${date} ${time}`)
  }

  const getDateTime = () => {
    const dateValue = transToDate(value)
    if (dateValue) {
      const fmt = mode === 'datetime' ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd'
      const displayValue = formatTime(dateValue, fmt)
      let [displayDate, displayTime] = displayValue.split(' ')
      return {
        displayValue,
        displayDate,
        displayTime,
      }
    }

    if (mode === 'datetime' && isEmpty(value)) {
      return {
        displayTime: formatTime(Date.now(), 'HH:mm'),
      }
    }
    return {}
  }

  const { displayValue, displayDate, displayTime } = getDateTime()

  return (
    <ActionField onClick={show} disabled={disabled} value={displayValue} placeholder={placeholder}>
      <AtActionSheet title={label} onClose={close} isOpened={visible} cancelText='取消'>
        <AtActionSheetItem>
          {mode === 'date' && <AtCalendar isVertical currentDate={displayDate} onSelectDate={handleDateSelected} />}

          {mode === 'datetime' && (
            <Picker mode='time' value={displayTime} onChange={handleTimeChange} onCancel={close}>
              {showCalendar && <AtCalendar isVertical currentDate={date} onSelectDate={handleDateSelected} />}
            </Picker>
          )}
        </AtActionSheetItem>
      </AtActionSheet>
    </ActionField>
  )
}

EleCalendar.defaultProps = {
  placeholder: '请选择',
  onChange: noop,
  mode: 'date',
  // mode: 'datetime',
  value: '',
  disabled: false,
}

export default EleCalendar
