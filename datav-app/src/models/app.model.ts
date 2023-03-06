import AuthTools, { AuthInfoSecurityStatus, AuthInfoType } from '@/nice-router/auth-tools'
import NavigationService from '@/nice-router/navigation-service'
import { ApiConfig } from '@/utils/config'
import ActionUtil from '@/nice-router/action-util'
import OfflineService from '@/service/offline/offline-service'
import StorageTools from '@/nice-router/storage-tools'
import _ from 'lodash'

export type DoLoginProps = {
  loginMethod: 'wechat_work_app' | 'wechat_app' | 'mobile_vcode' | 'wechat_mobile' | 'account_password';
};

function doRemoteLogin(payload) {
  const { options = {}, ...params } = payload

  NavigationService.put(ApiConfig.Login, params, {
    statInPage: true,
    onSuccess: async (data, resp) => {
      if (options.onSuccess) {
        options.onSuccess(data)
      }

      const { authorization } = resp.headers
      let authInfo: AuthInfoType = {} as AuthInfoType
      if (authorization) {
        // noinspection JSIgnoredPromiseFromCall
        await AuthTools.saveTokenAsync(authorization)
        authInfo = AuthTools.toAuthInfo(authorization)
      }

      if (params.login) {
        const lastLoginInfo = {
          login: params.login,
          factory: _.get(params, 'extraData.factory'),
        }
        await StorageTools.set('last-login-info', lastLoginInfo)
      }

      // 登录成功
      if (authInfo.securityStatus === AuthInfoSecurityStatus.CERTIFICATE || data.loginSuccess) {
        await OfflineService.setOnlineLoginInfo(data)

        const callbackAction = { linkToUrl: data.callbackUrl, ...data }
        // 如果resp 不是Action或者不包含callbackUrl，则直接后退,
        if (!ActionUtil.isActionLike(callbackAction)) {
          await NavigationService.back()
          return
        }

        // do login success callback
        await NavigationService.view(
          callbackAction,
          {},
          {
            navigationMethod: 'replace',
            ...options,
            onSuccess: (cbData, cbResp) => {
              console.log('success login an success do callback', cbData)
              if (cbResp.success) {
                NavigationService.back()
              }
            },
          },
        )
      }
    },
  })
}

export default {
  namespace: 'app',
  state: {
    networkInfo: {},
  },
  reducers: {
    saveNetworkInfo(state, { payload }) {
      return {
        ...state,
        networkInfo: payload,
      }
    },
  },
  effects: {
    * login({ payload }: { payload: DoLoginProps }) {
      const { loginMethod } = payload || {}
      if (loginMethod === 'wechat_work_app' || loginMethod === 'wechat_app') {
        console.error('TODO 暂支持微信登录')
        return
      }
      console.log('登录。。。非微信登录')
      doRemoteLogin(payload)
    },

    * logout() {
      console.log('logout from app')
      yield AuthTools.logout()
    },
  },
  subscriptions: {},
}
