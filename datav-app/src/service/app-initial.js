import { Text, TextInput } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import 'moment/locale/zh-cn'
import teasetInit from './teaset-theme'
import JPushTools from '@/utils/third-part/jpush'
import { noop } from '@/nice-router/nice-router-util'
import TouchIdTools from '@/service/touch-id/touch-id-tools'

function hiddenSplashScreen() {
  if (SplashScreen) {
    SplashScreen.hide()
  }
}

function appInitial() {
  teasetInit()
  TouchIdTools.g().initial()

  JPushTools.initJPush().then(noop)
  hiddenSplashScreen()
  // Text.defaultProps.allowFontScaling = false
  TextInput.defaultProps = Object.assign({}, TextInput.defaultProps, {
    allowFontScaling: false,
  }) // 新版RN使用该方法替代
  Text.defaultProps = Object.assign({}, Text.defaultProps, {
    allowFontScaling: false,
  })
}

function appUninstall() {
  JPushTools.uninstallJPush()
}

export { appInitial, appUninstall }
