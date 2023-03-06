import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { codeLength, isEmpty } from '@/nice-router/nice-router-util'

interface StatusFlagType {
  title?: string;
  size?: 'normal' | 'small';
}

const getTextSizeClass = (title = '') => {
  const length = codeLength(title)

  //两个字
  if (length <= 4) {
    return styles.largeText
  }
  //三个字
  if (length > 4 && length <= 6) {
    return styles.normalText
  }
  //四个字
  if (length > 6 && length <= 8) {
    return styles.smallText
  }
  //五个字
  if (length >= 10) {
    return styles.tinyText
  }
}
export default function StatusFlag(props: StatusFlagType) {

  const { title = '', size = 'normal' } = props

  if (isEmpty(title)) {
    return null
  }

  const txtClass = getTextSizeClass(title)

  return (
    <View style={styles.container}>
      <View pointerEvents='none' style={[styles.statusFlag, styles[size]]} />
      <Text style={[styles.statusFlagText, txtClass, { transform: [{ rotate: '45deg' }] }]}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    right: 0,
    zIndex: 9999,
    position: 'absolute',
  },
  statusFlag: {
    top: 0,
    right: 0,
    position: 'absolute',
    width: 0,
    height: 0,
    borderTopColor: '#d2ab66',
    borderTopWidth: 55,
    borderLeftColor: 'transparent',
    borderLeftWidth: 55,
    opacity: 0.9,
  },
  small: {
    borderTopWidth: 45,
    borderLeftWidth: 45,
  },
  statusFlagText: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    textAlign: 'center',
    position: 'absolute',
    top: 12,
    right: -20,
    width: 72,
    height: 26,
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  largeText: {
    fontSize: 16,
    top: 12,
    right: -16,
  },
  normalText: {
    fontSize: 14,
    top: 14,
    right: -12,
  },
  smallText: {
    fontSize: 12,
    top: 14,
    right: -10,
  },
  tinyText: {
    fontSize: 10,
    top: 14,
    right: -8,
  },

})
