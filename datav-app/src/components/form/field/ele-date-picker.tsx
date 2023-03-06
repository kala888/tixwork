import React, { useEffect, useState } from 'react'
import BorderedWrapper from '@/components/form/field/bordered-wrapper'
import { StyleSheet, Text, View } from 'react-native'
import { formatTime } from '@/utils'
import { DatePicker } from '@ant-design/react-native'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import { DatePickerProps } from '@ant-design/react-native/lib/date-picker'
import colors from '@/utils/colors'

type EleDatePickerType = {
  onChange: Function;
  label?: string;
  value?: any;
  disabled?: boolean;
  mode: 'date' | 'datetime'
} & Partial<DatePickerProps>

export default function EleDatePicker(props: EleDatePickerType) {
  const { onChange, mode, value: theValue, format = 'YYYY-MM-DD', ...rest } = props
  const [value, setValue] = useState<Date>()

  useEffect(() => {
    if (theValue === Date) {
      setValue(value)
    }
    if (isNotEmpty(theValue)) {
      setValue(new Date(theValue))
    }
    // eslint-disable-next-line
  }, [theValue, mode])

  const handleChange = (v) => {
    if (mode === 'date') {
      v.setHours(0)
      v.setMinutes(0)
      v.setSeconds(0)
      v.setMilliseconds(0)
    }
    const numberValue = v.getTime()
    onChange && onChange(numberValue)
    setValue(v)
  }
  const dateText = formatTime(value, mode === 'datetime' ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd')

  return (
    <BorderedWrapper>
      <View style={{ width: '100%' }}>
        <DatePicker
          {...rest}
          mode={mode}
          defaultDate={value || new Date()}
          format={format}
          onChange={handleChange}
        >
          <Text style={value ? styles.text : styles.placeholder}>{value ? dateText : '请选择'}</Text>
        </DatePicker>
      </View>
    </BorderedWrapper>
  )
}
EleDatePicker.defaultValue = {
  value: null,
}

const styles = StyleSheet.create({
  text: {
    color: colors.textColor,
  },
  placeholder: {
    color: colors.textColorLighter,
  },
})
