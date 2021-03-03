/* eslint-disable */
import AuthTools from '@/nice-router/auth-tools';
import NavigationService from '@/nice-router/navigation-service';
import { ApiConfig } from '@/utils/config';
import Taro from '@tarojs/taro';
import { isNotEmpty } from '@/nice-router/nice-router-util';
import ActionUtil from '@/nice-router/action-util';

export type DoLoginProps = {
  loginMethod: 'wechat_work_app' | 'wechat_app' | 'mobile_vcode' | 'wechat_mobile' | 'account_password';
};

function wechatLogin(payload: DoLoginProps) {
  const { loginMethod } = payload || {};
  // @ts-ignore
  const wxObj = loginMethod === 'wechat_work_app' ? wx.qy : Taro;

  const doLogin = () => {
    wxObj.login({
      success: async (response) => {
        console.log('进行wx login, code is', response.code, payload);
        doRemoteLogin({ ...payload, code: response.code });
      },
    });
  };

  // noinspection JSIgnoredPromiseFromCall
  wxObj.checkSession({
    success: async () => {
      const isValidate = await AuthTools.isValidateToken();
      console.log('token isValidate?', isValidate);
      if (!isValidate) {
        doLogin();
      }
    },
    fail: () => {
      console.log('session失效，重新登录');
      doLogin();
    },
  });
}

function doRemoteLogin(payload) {
  const { options = {}, ...params } = payload;
  NavigationService.put(ApiConfig.Login, params, {
    statInPage: true,
    onSuccess: async (resp, { headers }) => {
      if (options.onSuccess) {
        options.onSuccess(resp);
      }

      const { authorization } = headers;
      console.log('wx login response, headers', headers);
      if (authorization) {
        // noinspection JSIgnoredPromiseFromCall
        await AuthTools.saveTokenAsync(authorization);
      }

      const { callbackUrl, loginSuccess = false } = resp;
      if (loginSuccess) {
        let callbackAction = resp;
        if (isNotEmpty(callbackUrl)) {
          callbackAction = { linkToUrl: callbackUrl };
        }
        if (!ActionUtil.isActionLike(callbackAction)) {
          await NavigationService.back();
          return;
        }

        await NavigationService.view(
          callbackAction,
          {},
          {
            navigationMethod: 'redirectTo',
            ...options,
            onSuccess: (data, resp) => {
              console.log('after login redirect resp', data);
              if (resp.success) {
                NavigationService.back();
              }
            },
          }
        );
      }
    },
  });
}

export default {
  namespace: 'app',
  state: {
    callbackUrl: '',
    loginSuccess: false,
  },
  reducers: {},
  effects: {
    *login({ payload }: { payload: DoLoginProps }) {
      const { loginMethod } = payload || {};
      if (loginMethod === 'wechat_work_app' || loginMethod === 'wechat_app') {
        wechatLogin(payload);
        return;
      }
      console.log('登录。。。非微信登录');
      doRemoteLogin(payload);
    },

    *logout() {
      console.log('logout from app');
      yield AuthTools.logout();
    },
  },
  subscriptions: {},
};
