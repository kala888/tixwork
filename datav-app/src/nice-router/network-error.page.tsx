import React from 'react'
import { Image, StyleSheet, Text } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'

import device from './device'
import ActionIcon from '../components/action-icon'
import colors from '@/utils/colors'

const networkImage = require('./network.png')

export default function NetworkErrorPage(props) {
  const {
    title = '网络状态待提升，稍后重试',
    brief = '',
    networkError = true,
  } = props

  return (
    <SafeAreaView style={styles.container}>
      {networkError ? (
        <Image source={networkImage} style={styles.image} />
      ) : (
        <ActionIcon
          icon={'fontawesome5-bug'}
          color={colors.primaryColor}
          size={49}
        />
      )}
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.text}>{brief}</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: device.height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingBottom: 200,
  },
  image: {
    width: 150,
    height: 150,
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
})
