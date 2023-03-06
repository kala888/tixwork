import React, {useRef} from 'react'
import {WebView} from 'react-native-webview'
import NavigationService from '@/nice-router/navigation-service'
import AuthTools from '@/nice-router/auth-tools'
import {Linking, StatusBar} from 'react-native'
import {ActivityIndicator} from '@ant-design/react-native'
import device from '@/nice-router/device'
import _ from 'lodash'
import LocationService from '@/service/location-service'
import PermissionService from '@/service/permission-service'
import NetworkErrorPage from '@/nice-router/network-error.page'
import {StackActions} from '@react-navigation/native'

const queryString = require('query-string')

const NETWORK_ISSUE_CODE = [-6, -2, -11, -8, -1, -1009, 310]


export default function Dashboard(props) {
  const webview = useRef<any>()
  const {navigation, src} = props
  console.log("view src", src)

  //回调H5上的方法，默认去widow上的callback，传字符串
  const callbackH5Function = (funcName, object) => {
    const str = JSON.stringify(object)
    const runScript = `
    // alert(typeof window.${funcName} )
      if(typeof window.${funcName} === 'function' ){
        window.${funcName}('${str}')
      }
      true;
    `
    // @ts-ignore
    webview.current.injectJavaScript(runScript)
  }

  const getDeviceInfo = (action) =>
    callbackH5Function(action.callback || 'setDeviceInfo', device)
  const getLocation = _.throttle((action) => {
    LocationService.getLocation()
      .then((location) => {
        console.log('location', location)
        callbackH5Function(action.callback || 'setLocation', location)
      })
      .catch((error) => {
        callbackH5Function(action.callback || 'setLocation', error)
      })
  }, 1000)

  const checkPermission = (action) => {
    PermissionService.check(action.value)
      .then((result) => {
        callbackH5Function(action.callback || 'setPermission', {code: result})
      })
      .catch(() => {
        callbackH5Function(action.callback || 'setPermission', {
          code: 'error',
        })
      })
  }

  const checkCameraPermission = (action) => {
    PermissionService.checkCameraPermission()
      .then((result) => {
        callbackH5Function(action.callback || 'setPermission', {code: result})
      })
      .catch(() => {
        callbackH5Function(action.callback || 'setPermission', {
          code: 'error',
        })
      })
  }

  const actions = {
    saveToken: (action) => AuthTools.saveTokenAsync(action),
    goLogin: (action) =>
      NavigationService.getNavigation().dispatch(
        StackActions.replace('LoginPage', action),
      ),
    setTitle: (action) => setHeaderTitle(action.title),
    getDeviceInfo: getDeviceInfo,
    getLocation: getLocation,
    view: (action) => NavigationService.view(action),
    goSetting: () => Linking.openSettings().then(),
    checkPermission: checkPermission,
    checkCameraPermission: checkCameraPermission,
    logging: (action) => console.log('logging from H5', action.text),
  }

  // H5 端口发来登录命令，
  const handleMessage = (event) => {
    // console.log('callll event....', event)
    const {nativeEvent = {}} = event
    const {data = '{}'} = nativeEvent

    const action = JSON.parse(data)
    const targetFunction = actions[action.code]
    console.log('H5 Action message', action, data)
    if (targetFunction) {
      targetFunction(action)
    }
  }

  const setHeaderTitle = (title = '') => {
    console.log('set...', title)
    if (!_.startsWith(title, 'http')) {
      navigation.setOptions({headerTitle: title})
    }
  }

  const handleStateChange = (navState) => {
    const {url, title} = navState
    const parsed = queryString.parse(url)
    setHeaderTitle(title || parsed.headerTitle)
  }

  const renderError = (__, code) => {
    const isNetworkIssue = NETWORK_ISSUE_CODE.indexOf(code) > -1
    const title = isNetworkIssue
      ? '网络状态待提升，稍后重试'
      : '出错啦，请稍后再试'
    const brief = isNetworkIssue ? '' : `错误代码: ${code}`
    return (
      <NetworkErrorPage
        title={title}
        brief={brief}
        networkError={isNetworkIssue}
      />
    )
  }

  const injectToken = () => {
    AuthTools.getTokenAsync().then((token = {}) => {
      console.log('trying to inject RN token to H5: ', token)
      webview.current.injectJavaScript(
        `(function() {
        // window.localStorage.setItem('TOKEN', '${token}');
        // window.localStorage.setItem('REFER', 'native-app');

        // 兼容nice-router-taro，taro不是直接存数据到localStorage，而是包装成{data:''}
         if(typeof window.syncToken === 'function'){
          window.syncToken("${token}")
          console.log("inject to from App")
        }
      })();
       true;
      `,
      )
      console.log('injected')
    })
  }

  return (
    <>
      <StatusBar backgroundColor='#fff' translucent={true} hidden={true} animated={true}/>
      <WebView
        ref={webview}
        // @ts-ignore
        source={{uri: src}}
        javaScriptEnabled
        onMessage={handleMessage}
        startInLoadingState
        showsVerticalScrollIndicator={false}
        allowsBackForwardNavigationGestures={false}
        mediaPlaybackRequiresUserAction={false}
        onNavigationStateChange={handleStateChange}
        renderLoading={() => <ActivityIndicator toast text='正在加载'/>}
        renderError={renderError}
        javaScriptEnabledAndroid
        onLoadProgress={injectToken}
      />
    </>
  )
}
