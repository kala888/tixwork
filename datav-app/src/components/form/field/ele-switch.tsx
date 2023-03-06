import { toBoolean } from '@/nice-router/nice-router-util'
import { CandidateValue } from '@/nice-router/nice-router-types'
import React from 'react'
import { Switch } from '@ant-design/react-native'
import { StyleSheet, Text, View } from 'react-native'
import colors from '@/utils/colors'

// candidateValues 就是 options
// candidateValues = [{
//   id: '11',
//   title: '男',
//   value: 'true',
// }, {
//   id: '22',
//   title: '女',
//   value: 'false',
// }]

type EleSwitchProps = {
  value?: boolean;
  candidateValues: CandidateValue[];
  disabled?: boolean;
};

function EleSwitch(props: EleSwitchProps) {
  const { value = false, candidateValues = [], ...rest } = props
  const checked = toBoolean(value)
  const selectedItem = candidateValues.find((it) => toBoolean(it.id) === checked)
  const title = selectedItem ? selectedItem.title : ''

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Switch{...rest} checked={checked} style={styles.container} />
    </View>
  )
}

export default EleSwitch

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    paddingRight: 20,
    color: colors.textColor,
  },
})
