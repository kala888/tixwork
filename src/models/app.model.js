/* eslint-disable */
import NavigationService from '@/nice-router/navigation.service'
import Config from '@/utils/config'
import AuthTools from '@/nice-router/auth-tools'
import Taro from '@tarojs/taro'

function wxLogin(wxObj, loginMethod) {
  console.log('进行wx login')
  wxObj.login({
    success: async (response) => {
      console.log('进行wx login, code is', response.code)
      await login({ loginMethod, code: response.code })
    },
  })
}

async function login(params = {}) {
  NavigationService.put(Config.api.Login, params, {
    onSuccess: (resp, { headers }) => {
      const { authorization } = headers
      console.log('wx login response, headers', headers)
      if (authorization) {
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
      let { loginMethod } = payload
      yield put({ type: 'logout' })

      if (!Config.useWxLogin) {
        console.log('登录。。。非微信登录')
        this.login(payload)
        return
      }

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
            wxLogin(wxObj, loginMethod)
          }
        },
        fail: () => {
          console.log('session失效，重新登录')
          wxLogin(wxObj, loginMethod)
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
