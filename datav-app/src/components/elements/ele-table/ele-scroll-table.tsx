import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import EleTable, { EleTableProps } from '@/components/elements/ele-table/ele-table'
import device from '@/nice-router/device'


type EleScrollTableType = {
  width?: number
} & Partial<EleTableProps>

function EleScrollTable(props: EleScrollTableType) {
  const { width = device.width * 2, ...rest } = props

  return (
    <ScrollView horizontal style={styles.container} persistentScrollbar={true}>
      <View style={{ width }}>
        <EleTable {...rest} />
      </View>
    </ScrollView>
  )
}

export default EleScrollTable


const styles = StyleSheet.create({
  container: {
    paddingBottom:20
  },
})
