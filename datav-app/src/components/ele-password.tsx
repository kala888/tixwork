import React from 'react'
import { Keyboard, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { noop } from '@/nice-router/nice-router-util'
import { useVisible } from '@/service/use-service'
import IconEye from '../iconfont/IconEye'
import IconEyeOff from '../iconfont/IconEyeOff'
import device from '@/nice-router/device'
import BorderedWrapper from '@/components/form/field/bordered-wrapper'

const ElePassword = React.forwardRef((props: TextInput, ref) => {
  const { onSubmitEditing = noop } = props

  const { visible, toggle } = useVisible(false)
  const { onChange, ...rest } = props

  const handleSubmitEditing = () => {
    onSubmitEditing()
    Keyboard.dismiss()
  }
  const handleChange = ({ nativeEvent: { text } }) => onChange && onChange(text)

  return (
    <BorderedWrapper bordered={false}>
      <TextInput ref={ref} onSubmitEditing={handleSubmitEditing} onChange={handleChange}
                 secureTextEntry={!visible} {...rest} />
      <TouchableOpacity style={styles.icon} activeOpacity={0.7} onPress={toggle}>
        {visible ? <IconEye size={24} color={'#ccc'} /> : <IconEyeOff size={24} color={'#ccc'} />}
      </TouchableOpacity>
    </BorderedWrapper>
  )
})

export default ElePassword

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: device.isBigger ? 46 : 40,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999,
  },
})
