import ViewmappingService from '@/nice-router/viewmapping-service';
import Taro from '@tarojs/taro';
import { isWeapp } from '@/utils';
import GlobalLoading from '@/components/global-popup/global-loading';
import { isNotEmpty } from '@/utils/object-utils';
import GlobalToast from '@/components/global-popup/global-toast';
import { API } from '@/http/api-types';
import LoadingType from '@/nice-router/loading-type';

const systemErrorXClass = 'com.tiandtech.local.NetworkException';

function showLoading(loading: LoadingType) {
  if (loading === LoadingType.Modal) {
    GlobalLoading.showLoadingModal();
  }
  if (isWeapp() && loading === LoadingType.BarLoading) {
    Taro.showNavigationBarLoading();
  }
}

async function hideLoading(loading: LoadingType) {
  if (loading === LoadingType.Modal) {
    GlobalLoading.hideLoadingModal();
  }
  if (isWeapp() && loading === LoadingType.BarLoading) {
    Taro.hideNavigationBarLoading();
  }
}

function showError(resp: API.WebResult) {
  const { msg, data, responseOptions } = resp;
  const { xClass } = responseOptions;

  console.error('request got error', xClass, data);
  const view = ViewmappingService.getView(xClass);
  // 系统错误，根据xclass跳转页面
  if (xClass === systemErrorXClass || isNotEmpty(view)) {
    return;
  }

  const message: string = Array.isArray(msg) ? msg.map((it) => it.body).join('\n') : msg;
  if (isNotEmpty(message)) {
    GlobalToast.show({ text: message, duration: 5000 });
    return;
  }
  // 开发环境，如果没有配置 本地错误，
  if (process.env.NODE_ENV === 'development') {
    GlobalToast.show({ text: `开发环境：错误信息:${JSON.stringify(data)}`, duration: 5000 });
  }
}

const LoadingAndLogsProcessor = (chain) => {
  const { requestParams } = chain;
  const { loading } = requestParams;
  showLoading(loading);

  return chain.proceed(requestParams).then(async (resp: API.WebResult) => {
    const { data, responseOptions } = resp;
    const { success, headers = {} } = responseOptions;

    await hideLoading(loading);

    if (!success) {
      showError(resp);
    }
    console.log('%c****************************', 'color:#40aad8');
    console.log('%c*  request Option:', 'color:#40aad8', requestParams);
    console.log('');
    console.log('%c*  X-Class:', 'color:#40aad8', headers['x-class']);
    console.log('%c*  X-Env-Type:', 'color:#40aad8', headers['x-env-type']);
    console.log('%c*  JSON Data:', 'color:#40aad8', data);
    console.log('%c****************************', 'color:#40aad8');
    return resp;
  });
};

export default LoadingAndLogsProcessor;
