/* eslint-disable */
import AuthTools from '@/nice-router/auth-tools'
import NavigationService from '@/nice-router/navigation-service'
import Config from '@/utils/config'
import Taro from '@tarojs/taro'

function wechatLogin(loginMethod, options) {
  const wxObj = loginMethod === 'wechat_work_app' ? wx.qy : Taro
  const doLogin = () => {
    wxObj.login({
      success: async (response) => {
        console.log('进行wx login, code is', response.code)
        await remoteLogin({ loginMethod, code: response.code }, options)
      },
    })
  }

  // noinspection JSIgnoredPromiseFromCall
  wxObj.checkSession({
    success: async () => {
      const isValidate = await AuthTools.isValidateToken()
      console.log('token isValidate?', isValidate)
      if (!isValidate) {
        doLogin()
      }
    },
    fail: () => {
      console.log('session失效，重新登录')
      doLogin()
    },
  })
}

function remoteLogin(params = {}, options = {}) {
  const navigationOptions = {}
  if (!options.statInPage) {
    navigationOptions.method = 'reLaunch'
  }

  NavigationService.put(Config.api.Login, params, {
    navigationOptions,
    ...options,
    onSuccess: (resp, { headers }) => {
      if (options.onSuccess) {
        options.onSuccess(resp)
      }
      const { authorization } = headers
      console.log('wx login response, headers', headers)
      if (authorization) {
        // noinspection JSIgnoredPromiseFromCall
        AuthTools.saveTokenAsync(authorization)
      }
    },
  })
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
      const { loginMethod } = params

      if (loginMethod === 'wechat_work_app' || loginMethod === 'wechat_app') {
        wechatLogin(loginMethod, options)
        return
      }

      console.log('登录。。。非微信登录')
      remoteLogin(params, options)
    },

    *logout() {
      console.log('logout from app')
      yield AuthTools.logout()
    },
  },
  subscriptions: {},
}
