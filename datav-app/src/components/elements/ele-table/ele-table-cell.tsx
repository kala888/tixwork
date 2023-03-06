import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import colors from '@/utils/colors'
import _ from 'lodash'

export type EleTableCellProps = {
  title?: string;
  colspan?: number;
  children?: React.ReactNode;
  mode?: 'left' | 'right';
  bordered?: boolean;
  header?: boolean;
  style?: any;
};

const EleTableCell: React.FC<EleTableCellProps> = (props) => {
  const { title, colspan = 1, mode = '', style, bordered = true, header = false } = props

  const rootClass = [
    styles.container,
    bordered ? styles.bordered : {},
    header ? styles.header : {},
    { flex: _.toNumber(colspan) },
    styles[mode],
    style,
  ]

  const titleClass = [
    styles.title,
    header ? styles.headerTitle : {},
    styles[mode],
  ]

  return (
    <View style={rootClass}>
      {isNotEmpty(title) && <Text style={titleClass}>{title}</Text>}
      {props.children}
    </View>
  )
}

export default EleTableCell


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bordered: {
    borderRightWidth: 0.5,
    borderRightColor: colors.textColorLight,
  },
  left: {
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  right: {
    alignItems: 'flex-end',
    textAlign: 'right',
  },
  title: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    textAlign: 'center',
    lineHeight: 20,
    color: colors.textColorLight,
    fontSize: 16,
  },
  headerTitle: {
    fontWeight: '500',
  },
})
