import React from 'react'
import EleTableRow, { EleTableRowProps } from './ele-table-row'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import { StyleSheet, Text, View } from 'react-native'
import colors from '@/utils/colors'

export type EleTableProps = {
  title?: string;
  data?: EleTableRowProps[];
  children?: React.ReactNode;
  bordered?: boolean;
  style?: any;
};

function EleTable(props: EleTableProps) {
  const { title, data = [], bordered = true, style } = props
  const rootClass = [styles.container, style]
  const titleClass = [styles.title]
  if (bordered) {
    rootClass.push(styles.bordered)
    titleClass.push(styles.borderedTitle)
  }
  return (
    <View style={rootClass}>
      {isNotEmpty(title) && (
        <View style={titleClass}>
          <Text style={styles.titleTxt}>{title}</Text>
        </View>
      )}
      {data.map((row, idx) => (
        <EleTableRow
          key={`ele-table-row-${idx}`}
          items={row.items}
          header={row.header}
          bordered={bordered}
          {...row}
          lastRow={idx + 1 === data.length}
        />
      ))}

      {
        React.Children.map(props.children, (child) => {
          if (child) {
            // @ts-ignore
            return React.cloneElement(child, { bordered })
          }
          return null
        })
      }

    </View>
  )
}

export default EleTable


const styles = StyleSheet.create({
  container: {
    color: colors.textColor,
    flexDirection: 'column',
    fontSize: 26,
    marginTop: 20,
  },
  bordered: {
    borderWidth: 1,
    borderColor: colors.textColorLighter,
    borderRadius: 2,
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1,
  },
  borderedTitle: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.textColorLight,
  },
  titleTxt: {
    color: colors.textColor,
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 40,
  },
})
