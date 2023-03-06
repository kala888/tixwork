import React from 'react'
import { Keyboard, StyleSheet, TextInput, View } from 'react-native'
import { noop } from '@/nice-router/nice-router-util'
import BorderedWrapper from '@/components/form/field/bordered-wrapper'
import { getDisplayValue } from '@/components/form/form-util'
import colors from '@/utils/colors'
import _ from 'lodash'

export type EleInputType = { bordered?: boolean } & Partial<TextInput>

const EleInput = React.forwardRef((props: TextInput, ref) => {
  const { onSubmitEditing = noop } = props

  const handleSubmitEditing = () => {
    onSubmitEditing()
    Keyboard.dismiss()
  }
  const { style, bordered = false, onChange, value, disabled, ...rest } = props

  const theValue = getDisplayValue(value)

  const placeholder = _.get(props, 'placeholder', '请输入')

  return (
    <BorderedWrapper bordered={bordered}>
      <View style={{ width: '100%' }}>
        <TextInput
          placeholder={disabled ? '' : placeholder}
          ref={ref}
          value={theValue}
          onChangeText={onChange}
          onSubmitEditing={handleSubmitEditing}
          editable={!disabled}
          {...rest}
          style={[styles.container, style, disabled ? styles.disabled : {}]}
          selection={disabled ? { start: 0 } : undefined}
        />
      </View>
    </BorderedWrapper>
  )
})

export default EleInput

const styles = StyleSheet.create({
  container: {
    height: 32,
    paddingTop: 0,
    paddingBottom: 0,
  },
  disabled: {
    color: colors.textColorLighter,
  },
})

