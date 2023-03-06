// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { isNotEmpty } from '@/nice-router/nice-router-util'

import { CandidateValue } from '@/nice-router/nice-router-types'
import ActionIcon from '@/components/action-icon'
import { Picker } from '@ant-design/react-native'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export type ElePickerProps = {
  value?: string | CandidateValue | CandidateValue[];
  onChange?: (values: CandidateValue[]) => void;
  placeholder?: string;
  candidateValues: CandidateValue[];
  numberOfColumn?: number;
  disabled?: boolean;
};


const CustomChildren = props => (
  <TouchableOpacity onPress={props.onPress}>

    <View style={styles.container}>
      <Text style={{ flex: 1 }}>{props.children}</Text>
      <Text style={styles.value}>{props.extra}</Text>
      <ActionIcon icon='iconfont-right' />
    </View>


  </TouchableOpacity>
)

const transData = (list = []) => {
  if (typeof list?.map !== 'function') {
    return []
  }
  return list.map(it => {
    const item = {
      label: it.title,
      value: it.id,
    }
    if (isNotEmpty(it.candidateValues)) {
      item.children = transData(it.candidateValues)
    }
    return item
  })
}

function ElePicker(props: ElePickerProps) {

  const [values, setValues] = useState([])


  const {
    value,
    onChange,
    placeholder,
    candidateValues,
    numberOfColumn,
    disabled,
  } = props

  useEffect(() => {
    console.log('.....value', value)
    setValues(value)
  }, [value])

  const source = transData(candidateValues)
  const handleChange = (v) => {
    setValues(v)
    onChange && onChange(v)
  }
  return (
    <Picker
      title='选择地区'
      data={source}
      value={values}
      onOk={handleChange}
      onChange={handleChange}
      cols={numberOfColumn}
      disabled={disabled}
      placeholder={placeholder}
    >
      <CustomChildren />
    </Picker>
  )
}

ElePicker.defaultProps = {
  displayMode: 'right-brief',
  customStyle: {},
  name: '',
  displayValue: '',
  candidateValues: [],
  placeholder: '请选择',
}

export default ElePicker


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    paddingLeft: 15,
  },
  value: {
    textAlign: 'right',
    color: '#888',
  },
})
