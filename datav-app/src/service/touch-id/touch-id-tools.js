import { isNotEmpty } from '@/nice-router/nice-router-util'
import StorageTools from '@/nice-router/storage-tools'
import moment from 'moment'
import TouchID from 'react-native-touch-id/index'
import colors from '@/utils/colors'
import AuthTools from '@/nice-router/auth-tools'

const TOUCH_ID_ENABLE = 'touch-id-enabled'
// const TOUCH_ID_SUPPORT_TYPE = 'touch-id-support-type'
// const TOUCH_ID_IS_SUPPORT = 'touch-id-is-support'

// const expiredTime = 1000 * 20
const expiredTime = 1000 * 3600 * 4

const optionalConfigObject = {
  title: '欢迎使用钛安科技', // Android
  imageColor: colors.primaryColor, // Android
  imageErrorColor: '#e00606', // Android
  sensorDescription: '识别', // Android
  sensorErrorDescription: '认证失败', // Android
  cancelText: '取消', // Android
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
}

const factory = () => {
  let lastVerifyTime = null
  let enabled = false
  let isSupport = false
  let supportType = {}

  const setIsSupport = (value) => (isSupport = value)
  const setEnabled = (value) => (enabled = value)
  const setSupportType = (value) => (supportType = value)
  const setTheEnabled = async (value) => {
    await StorageTools.set(TOUCH_ID_ENABLE, value)
    setEnabled(value)
  }

  const markAsALive = () => (lastVerifyTime = Date.now())
  const isInSafetyTime = () => moment().isBefore(lastVerifyTime + expiredTime) //4小时
  const logout = async () => (lastVerifyTime = null)

  const doTouchIdLogin = async () => {
    const loginInfo = await AuthTools.getLoginInfo()
    if (loginInfo.isValid) {
      const resp = await TouchID.authenticate('', optionalConfigObject)
      if (resp) {
        console.warn('make it alive')
        markAsALive()
      }
      return resp
    }
  }

  const initial = () => {
    TouchID.isSupported(optionalConfigObject)
      .then((type) => {
        setSupportType({
          type,
          title: type === 'FaceID' ? '面容' : '指纹',
        })
        setIsSupport(true)
      })
      .catch(() => {
        setIsSupport(false)
      })
    StorageTools.get(TOUCH_ID_ENABLE, false).then((value) =>
      setTheEnabled(value)
    )
  }

  return {
    isEnabled: () => enabled,
    setEnabled: setTheEnabled,
    isSupport: () => isSupport,
    getSupportType: () => supportType,
    markAsALive,
    isInSafetyTime,
    logout,
    doTouchIdLogin,
    initial,
  }
}

let instance = null

const TouchIdTools = {
  g: () => {
    if (isNotEmpty(instance)) {
      return instance
    }
    instance = factory()
    return instance
  },
}

export default TouchIdTools
