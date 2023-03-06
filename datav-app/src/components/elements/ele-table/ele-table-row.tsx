import React from 'react'
import EleTableCell, { EleTableCellProps } from './ele-table-cell'
import { StyleSheet, View } from 'react-native'
import colors from '@/utils/colors'

export type EleTableRowProps = {
  items?: EleTableCellProps[];
  header?: any;
  children?: any;
  bordered?: boolean
  lastRow?: boolean
  style?: any
}

const EleTableRow: React.FC<EleTableRowProps> = (props) => {
  const { items = [], header = false, bordered = true, lastRow = false, style } = props

  const rootClass = [
    styles.container,
    bordered ? styles.bordered : {},
    lastRow ? styles.lastRow : {},
    style,
  ]

  return (
    <View style={rootClass}>
      {items.map((it, idx) => (
        <EleTableCell key={`ele-table-cell-${idx}`} {...it} bordered={bordered} header={header} />
      ))}

      {
        React.Children.map(props.children, (child) => {
          if (child) {
            return React.cloneElement(child, { header, bordered })
          }
          return null
        })
      }
    </View>
  )
}

export default EleTableRow
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  bordered: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.textColorLight,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
})
