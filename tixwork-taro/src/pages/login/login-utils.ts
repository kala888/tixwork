import { isWeapp } from '@/utils';
import Taro from '@tarojs/taro';
import ActionUtil from '@/utils/action-util';
import NavigationService from '@/nice-router/navigation-service';
import ApiConfig from '@/utils/api-config';
import Q from '@/http/q';
import Config from '@/utils/config';
import ObjectUtils from '@/utils/object-utils';
import AuthTools from '@/utils/auth-tools';

// @ts-ignore
const wxObj = wx.qy || Taro;

const getCode = () => {
  return new Promise((resolve) => {
    if (isWeapp()) {
      wxObj.login().then((res) => {
        console.log('do wechat login, get code', res.code);
        resolve(res.code);
      });
    }
  });
};

type RemoteLogin = {
  params: Record<string, any>;
  onCompleted?: () => void;
  onSuccess?: () => void;
};

const remoteLogin = async (props: RemoteLogin) => {
  const { params, onCompleted, onSuccess } = props;
  const resp = await Q.post(ApiConfig.Login, {
    ...params,
    clientId: Config.clientId,
  });
  const data = resp?.data || {};
  const { callbackUrl, access_token } = data;

  onCompleted?.();
  //1. 判断是否正常登录
  const isLoginSuccess = ObjectUtils.isNotEmpty(access_token);
  if (!isLoginSuccess) {
    return;
  }
  //2.登录成功，处理token
  await AuthTools.saveTokenAsync(access_token);
  AuthTools.toAuthInfo(access_token);

  if (onSuccess) {
    onSuccess?.();
    return;
  }
  //3. 登录成功后，回调处理
  const callbackAction = { linkToUrl: callbackUrl, ...data };
  //4. 如果resp 不是Action或者不包含callbackUrl，则直接后退,
  if (!ActionUtil.isActionLike(callbackAction)) {
    await NavigationService.back();
    return;
  }

  //5.如果有回调URL，直接请求
  await NavigationService.view(
    callbackAction,
    {},
    {
      navigationMethod: 'replace',
      onSuccess: (cbData, cbResp) => {
        console.log('success login an success do callback', cbData);
        if (cbResp.success) {
          NavigationService.back();
        }
      },
    }
  );
};

const LoginUtils = {
  getCode,
  getWxObj: () => wxObj,
  // @ts-ignore 企业微信
  isQYWechat: () => !!wx.qy,
  remoteLogin,
};

export default LoginUtils;
