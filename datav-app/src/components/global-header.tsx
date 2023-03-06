import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import _ from 'lodash'
import { useNetInfo } from '@react-native-community/netinfo'
import OfflineService from '@/service/offline/offline-service'
import { useFocusEffect } from '@react-navigation/core'
import { getRemoveEnv } from '@/pages/app-config-page'
import colors from '@/utils/colors'

const defaultLoginInfo = {
  name: '未登录',
  employeeId: '工号',
  currentFactory: '工厂',
}

export default function GlobalHeader(props) {
  const [root, setRoot] = useState<any>(defaultLoginInfo)

  useFocusEffect(
    React.useCallback(() => {
      console.log('props', props)
      OfflineService.getLoginInfo(defaultLoginInfo).then(resp => {
        console.log('get info ', resp)
        setRoot(isNotEmpty(resp) ? resp : defaultLoginInfo)
      })
    }, [props]))

  const {
    name,
    currentFactory,
    employeeId,
  } = root

  const netInfo = useNetInfo()
  let connectTips: any = '离线'
  if (netInfo?.isConnected) {
    connectTips = netInfo.type === 'cellular' ? netInfo.details.cellularGeneration : netInfo.type
  }


  const connectInfoClass = [
    styles.txt,
    styles.networkText,
    !netInfo?.isConnected ? styles.networkTextDisconnect : {},
  ]

  const title = _.get(props, 'pageTitle') || _.get(props, 'title') || _.get(props, 'children', '')

  const env = getRemoveEnv()
  return (
    <View style={[styles.container, props.style]} ellipsizeMode='middle'>
      {
        isNotEmpty(root) && (
          <View style={styles.content}>
            {
              isNotEmpty(title) && (
                <>
                  <Text style={styles.txt}>{title}</Text>
                  <Text style={styles.split}>|</Text>
                </>
              )
            }
            <Text style={styles.txt}>{currentFactory}</Text>
            <Text style={styles.split}>|</Text>
            <Text style={styles.txt}>{name}</Text>
            <Text style={styles.split}>|</Text>
            <Text style={styles.txt}>{employeeId}</Text>
          </View>
        )
      }

      <View style={styles.network}>
        <Text style={connectInfoClass}>{env.code !== 'prod' && env.title} {_.toUpper(connectTips)}</Text>
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 30,
    paddingHorizontal: 10,
    backgroundColor: '#2b3890',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  network: {
    flex: 1,
    alignItems: 'flex-end',
  },
  networkText: {
    color: '#fff',
    fontWeight: '800',
  },
  networkTextDisconnect: {
    color: colors.red,
    fontWeight: '800',
  },
  split: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 3,
    alignSelf: 'center',
  },
  txt: {
    fontSize: 14,
    textAlign: 'center',
    color: '#fff',
  },

})
