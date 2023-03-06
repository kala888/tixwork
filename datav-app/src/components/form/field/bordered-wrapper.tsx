import colors from '@/utils/colors'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function BorderedWrapper(props) {
  const { style, bordered = true, padding = true } = props
  const rootClass = [
    styles.container,
    bordered ? styles.bordered : {},
    padding ? styles.padding : {},
    style,
  ]
  return (
    <View style={rootClass}>
        {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 32,
    alignItems: 'center',
    flexDirection: 'row',
  },
  bordered: {
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
  },
  padding: {
    paddingHorizontal: 10,
  },
})

