/* eslint-disable */
import NavigationService from '@/nice-router/navigation.service'
import Config from '@/utils/config'
import AuthTools from '@/nice-router/auth-tools'
import Taro from '@tarojs/taro'

export default {
  namespace: 'app',
  state: {},
  reducers: {},
  effects: {
    *wxLogin({ payload = {} }) {
      if (!Config.useWxLogin) {
        console.log('这个应用不使用WXLogin，Config.useWxLogin=' + Config.useWxLogin)
        return
      }

      console.log('payload', payload)
      let loginMethod = 'wechat_app'
      let wxObj = Taro

      if (wx.qy) {
        console.log('登录。。。企业微信登录')
        wxObj = wx.qy
        loginMethod = 'wechat_work_app'
      } else {
        console.log('登录。。。普通微信登录')
      }

      wxObj.checkSession({
        success: () => {
          console.log('有效 session')
        },
        fail: () => {
          console.log('session失效，重新登录')
          wxObj.login({
            success: (response) => {
              NavigationService.put(
                Config.api.Login,
                { loginMethod, code: response.code },
                {
                  statInPage: true,
                  onSuccess: (resp, { headers }) => {
                    const { authorization } = headers
                    console.log('111111', headers)
                    if (authorization) {
                      AuthTools.saveTokenAsync(authorization)
                    }
                  },
                }
              )
            },
          })
        },
      })
    },
  },
  subscriptions: {},
}
