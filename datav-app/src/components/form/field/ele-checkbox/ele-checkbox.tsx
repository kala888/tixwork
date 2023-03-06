import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ActionIcon from '@/components/action-icon'
import colors from '@/utils/colors'

export type EleCheckboxType = {
  id: string
  title: string
  checked?: boolean
  onPress: (item: EleCheckboxType) => void
  radio?: boolean
}

export default function EleCheckbox(props: EleCheckboxType) {
  const { title, onPress, radio, checked: checkedStatus } = props
  const [checked, setChecked] = useState(checkedStatus)

  useEffect(() => {
    setChecked(checkedStatus)
  }, [checkedStatus])

  const icon = `iconfont-${radio ? 'radio' : 'checkbox'}${checked ? '-checked' : ''}`

  const handlePress = () => {
    setChecked(pre => !pre)
    onPress && onPress(props)
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
      <View style={styles.item}>
        <ActionIcon icon={icon} color={colors.primaryColor} />
        <Text style={styles.label}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

EleCheckbox.defaultValue = {
  checked: false,
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    flexDirection: 'row',
    paddingRight: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  label: {
    paddingHorizontal: 4,
    fontSize: 16,
    color: colors.textColor,
  },
})
