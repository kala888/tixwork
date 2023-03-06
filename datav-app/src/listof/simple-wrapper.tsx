import React from 'react'
import { View } from 'react-native'

export default function SimpleWrapper(props) {
  const {
    data,
    keyExtractor,
    renderItem,
    ListHeaderComponent,
    ListFooterComponent,
  } = props

  return (
    <>
      {ListHeaderComponent}
      {
        data.map((item, index) => {
          const key = keyExtractor(item, index)
          return (
            <View key={key}>{renderItem({ item, index })}</View>
          )
        })
      }
      {ListFooterComponent}
    </>
  )
}
