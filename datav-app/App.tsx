import React from 'react'
import 'react-native-gesture-handler'
import Config from '@/nice-router/nice-router.config'
import { TheCustomizedProjectConfigurationDontUseItDirectly } from '@/utils/config'
import { Provider } from 'react-redux'
import { LogBox } from 'react-native'
import { Provider as AntdProvider } from '@ant-design/react-native'
import codePush from 'react-native-code-push'

import dva from './src/dva'
import models from './src/models/model-center'

import Router from './src/app-router/router'
import NetworkStatus from './src/service/network-status'
import DataSyncService from './src/service/offline/data-sync-service'
import useCodePushCheck from './src/service/codepush/useCodePush';

LogBox.ignoreLogs([
  'Require cycle:',
])

const dvaApp = dva.createApp({
  initialState: {},
  enableLog: false,
  models: models,
})
const store = dvaApp.getStore()
Config.start && Config.start(TheCustomizedProjectConfigurationDontUseItDirectly, dvaApp)

NetworkStatus.onMount()
DataSyncService.onMount().then()

const App = () => {
  useCodePushCheck();
  return (
    <Provider store={store}>
      <AntdProvider>
        <Router />
      </AntdProvider>
    </Provider>
  )
}

export default codePush({
  checkFrequency: codePush.CheckFrequency.MANUAL,
})(App)
