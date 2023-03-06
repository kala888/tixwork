import { units } from '@/utils'
import Listof from '@/listof/listof'
import React from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native'

export default function ObjectPickerPopupView() {
  // @ts-ignore
  const root = useSelector((state) => state.objectPicker)
  const { selectedItems = [], inbound = {} } = root || {}
  const { maxSelectCount } = inbound

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>已选择{selectedItems.length}，最多可选${maxSelectCount}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Listof list={selectedItems} displayMode='object-picker-popup' emptyMessage='还没有选择！' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 80 * units.vh,
    backgroundColor: '#fff',
  },

  title: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
})
