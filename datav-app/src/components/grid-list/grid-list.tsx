import { StyleSheet, View } from 'react-native'
import GridItem, { GridItemType } from '@/components/grid-list/grid-item'
import React from 'react'


type GridListType = {
  itemWidth?: number | string,
  itemHeight?: number | string,
  items: (Omit<GridItemType, 'index'> & { id: string })[]
}

export default function GridList(props: GridListType) {
  const { items = [], itemWidth, itemHeight } = props
  return (
    <View style={styles.container}>
      {items.map((it, idx) => (
        <GridItem
          key={`${it.id + it.title + idx}`}
          width={itemWidth}
          height={itemHeight}
          {...it}
          index={idx}
        />
      ))}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },
})
