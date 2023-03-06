import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from '@/utils/colors'
import { isNotEmpty } from '@/nice-router/nice-router-util'

export type FlexInfoItemProps = {
  id?: string
  title: string;
  value?: any;
  multiline?: boolean;
  borderTop?: boolean
  type?:
    | 'money'
    | 'longtext'
    | 'mobile'
    | 'auto'
    | 'user'
    | 'status'
    | 'date'
    | 'datetime'
    | 'document'
    | 'image'
    | 'image-list'
    | 'tag-list';
}

export default function FlexInfoItem(props: FlexInfoItemProps) {
  const { title, value, borderTop = true } = props
  return (
    <View style={[styles.container, borderTop ? styles.borderTop : {}]}>
      {
        isNotEmpty(title) && <Text style={styles.title}>{title}</Text>
      }
      <Text style={styles.value}>{value}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingVertical: 5,
      alignItems: 'center',
    },
    borderTop: {
      borderWidth: 0.5,
      borderColor: colors.borderColor,
    },
    title: {
      width: 100,
      color: colors.textColor,
    },
    value: {
      paddingLeft: 10,
      flex: 1,
      color: colors.textColor,
    },
  },
)
