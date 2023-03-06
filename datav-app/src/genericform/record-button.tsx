import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import ActionIcon from '@/components/action-icon'

const CenterButtonSize = 60

export default function RecordButton(props) {
  const { onPress } = props

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <ActionIcon icon='camera' color='#fff' />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: CenterButtonSize,
    width: CenterButtonSize,
    height: CenterButtonSize,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  wrapper: {
    borderRadius: CenterButtonSize - 10,
    width: CenterButtonSize - 10,
    height: CenterButtonSize - 10,
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
