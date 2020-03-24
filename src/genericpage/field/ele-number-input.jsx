import { AtInput } from 'taro-ui'
import { noop } from '@/nice-router/nice-router-util'

export default (props) => {
  const { name, value, onChange = noop, formatter = noop, parser = noop, ...others } = props
  const formattedValue = formatter(value)
  return (
    <AtInput
      name={name}
      // border={false}
      type='text'
      {...others}
      value={formattedValue}
      border={false}
      onChange={(v) => onChange(parser(v))}
    />
  )
}
