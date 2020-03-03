/* eslint-disable */
import NavigationService from '@/nice-router/navigation.service'
import Config from '@/utils/config'
import AuthTools from '@/nice-router/auth-tools'
import Taro from '@tarojs/taro'

function wxLogin(wxObj, loginMethod, options) {
  console.log('进行wx login')
  wxObj.login({
    success: async (response) => {
      console.log('进行wx login, code is', response.code)
      await remoteLogin({ loginMethod, code: response.code }, options)
    },
  })
}

function remoteLogin(params = {}, options = {}) {
  const navigationOptions = {}
  if (!options.statInPage) {
    navigationOptions.method = 'reLaunch'
  }

  NavigationService.put(
    Config.api.Login,
    {
      loginMethod: Config.usePassword ? 'account_password' : 'mobile_vcode',
      ...params,
    },
    {
      navigationOptions,
      ...options,
      onSuccess: (resp, { headers }) => {
        if (options.onSuccess) {
          options.onSuccess(resp)
        }
        const { authorization } = headers
        console.log('wx login response, headers', headers)
        if (authorization) {
          AuthTools.saveTokenAsync(authorization)
        }
      },
    }
  )
}

export default {
  namespace: 'app',
  state: {},
  reducers: {},
  effects: {
    *login({ payload = {} }, { put }) {
      const { statInPage, ...params } = payload
      const options = { statInPage }
      yield put({ type: 'logout' })
      if (!Config.useWxLogin) {
        console.log('登录。。。非微信登录')
        remoteLogin(params, options)
        return
      }

      let loginMethod = ''
      let wxObj = Taro
      if (wx.qy) {
        console.log('登录。。。企业微信登录')
        wxObj = wx.qy
        loginMethod = 'wechat_work_app'
      } else {
        console.log('登录。。。普通微信登录')
        loginMethod = 'wechat_app'
      }

      wxObj.checkSession({
        success: async () => {
          const isValidate = await AuthTools.isValidateToken()
          console.log('token isValidate?', isValidate)
          if (!isValidate) {
            wxLogin(wxObj, loginMethod, options)
          }
        },
        fail: () => {
          console.log('session失效，重新登录')
          wxLogin(wxObj, loginMethod, options)
        },
      })
    },

    *logout() {
      console.log('logout from app')
      yield AuthTools.logout()
    },
  },
  subscriptions: {},
}
