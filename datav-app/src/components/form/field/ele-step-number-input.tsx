import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { StepProps } from '@ant-design/react-native/lib/stepper'
import colors from '@/utils/colors'
import _ from 'lodash'
import EleButton from '@/components/elements/ele-button'

type ActionType = 'decrease' | 'increase'
// max,min, step
const EleStepNumberInput = (props: StepProps) => {
  const { value: theValue, style, onChange, step = 1, max = Infinity, min = -Infinity } = props

  const [value, setValue] = useState<number>(0)
  useEffect(() => {
    console.log('_.toNumber(theValue)', _.toNumber(theValue))
    setValue(_.toNumber(theValue))
  }, [theValue])

  const handleChange = (v, action?: ActionType) => {
    console.log('onchange', v)
    setValue(pre => {
      let next = v
      if (action === 'decrease') {
        // @ts-ignore
        next = pre - step
        next = next >= min ? next : min
      }
      if (action === 'increase') {
        // @ts-ignore
        next = pre + step
        next = next <= max ? next : max
      }
      onChange && onChange(next)
      return next
    })
  }
  const decreaseActionDisabled = value <= min
  const increaseActionDisabled = value >= max

  const handleIncrease = handleChange.bind(null, 'decrease')
  const handleDecrease = handleChange.bind(null, 'decrease')
  return (
    <View style={[styles.container, style]}>
      <EleButton
        style={styles.button}
        onPress={handleIncrease} disabled={decreaseActionDisabled}
      >
        <Text style={styles.buttonText}>-</Text>
      </EleButton>
      <TextInput
        keyboardType='numeric'
        style={styles.input}
        value={_.toString(value)}
        onChangeText={handleChange}
      />
      <EleButton style={styles.button}
                 onPress={handleDecrease}
                 disabled={increaseActionDisabled}
      >
        <Text style={styles.buttonText}>+</Text>
      </EleButton>
    </View>
  )
}

export default EleStepNumberInput
EleStepNumberInput.defaultValue = {
  value: 0,
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  buttonText: {
    fontSize: 28,
    lineHeight: 28,
    color: colors.textColorLighter,
    textAlign: 'center',
  },
  input: {
    width: 120,
    borderWidth: 0,
    textAlign: 'center',
    height: 28,
    color: colors.textColor,
    fontSize: 18,
  },
})


