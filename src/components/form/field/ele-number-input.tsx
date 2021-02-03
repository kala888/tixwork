import React from 'react'
import { noop } from '@/nice-router/nice-router-util'
import { AtInput } from 'taro-ui'

//'text' | 'number' | 'password' | 'phone' | 'idcard' | 'digit'
const defaultFormatter = (v) => v
const defaultParser = (v) => v
const EleNumberInput = (props) => {
  const { name, value, onChange = noop, formatter = defaultFormatter, parser = defaultParser, ...others } = props
  const formattedValue = formatter(value)
  return (
    <AtInput
      name={name}
      // border={false}
      type='number'
      {...others}
      value={formattedValue}
      border={false}
      onChange={(v) => onChange(parser(v))}
    />
  )
}

export default EleNumberInput
