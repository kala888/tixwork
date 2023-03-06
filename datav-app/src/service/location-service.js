import React from 'react'
import GetLocation from 'react-native-get-location'
import { Modal } from '@ant-design/react-native'
import { Image, Linking, StyleSheet, Text, View } from 'react-native'
import { noop } from '@/nice-router/nice-router-util'
import colors from '@/utils/colors'
import device from '@/nice-router/device'

const img = require('../assets/images/logo.png')

const openSettingTips = () => {
  const bodyIOS = (
    <View style={styles.body}>
      <Text style={styles.text}>请打开 设置=》隐私=》定位服务</Text>
      <Image style={styles.image} source={img} />
    </View>
  )
  const bodyAndroid = (
    <View style={styles.body}>
      <Text style={styles.text}>请打开设置开启定位服务后重试</Text>
    </View>
  )
  const handleGoSetting = () => Linking.openSettings().then()
  const handleCancel = noop

  const body = device.ios ? bodyIOS : bodyAndroid
  const actionList = [
    {
      text: '暂不开启',
      style: styles.closeButton,
      onPress: handleCancel,
    },
    {
      text: '去设置',
      style: styles.goSettingButton,
      onPress: handleGoSetting,
    },
  ]

  Modal.alert('需要打开系统定位开关', body, actionList)
}

const getLocation = () => {
  return new Promise((resolve, reject) => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        console.log('location', location)
        resolve(location)
      })
      .catch((error) => {
        // const { code, message } = error
        // // code= CANCELLED, UNAVAILABLE,TIMEOUT,UNAUTHORIZED
        console.log('cant get the location', error)
        // if (code === 'UNAUTHORIZED') {
        //   openSettingTips()
        // }
        reject(error)
      })
  })
}

const LocationService = {
  getLocation,
  openSettingTips,
}

export default LocationService

const styles = StyleSheet.create({
  body: {
    flexDirection: 'column',
  },
  text: {
    color: colors.textColorLight,
    fontSize: 14,
    fontWeight: '600',
  },
  image: {
    resizeMode: 'center',
    height: 260,
    width: 260,
  },
  closeButton: {
    color: colors.textColorLighter,
  },
  goSettingButton: {
    color: colors.primaryColor,
  },
})
