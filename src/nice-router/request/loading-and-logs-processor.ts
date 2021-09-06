import GlobalToast from '@/nice-router/global-toast';
import { isNotEmpty, LoadingType } from '@/nice-router/nice-router-util';
import GlobalLoading from '@/nice-router/global-loading';
import ViewmappingService from '@/nice-router/viewmapping-service';
import Taro from '@tarojs/taro';
import { HttpResponse } from '@/nice-router/request/reqeust';
import { isWeapp } from '@/utils/index';

const systemErrorXClass = 'com.terapico.caf.local.NetworkException';

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

function showError({ xClass, data = {} }: HttpResponse) {
  console.error('request got error', xClass, data);

  const view = ViewmappingService.getView(xClass);
  // 系统错误，根据xclass跳转页面
  if (xClass === systemErrorXClass || isNotEmpty(view)) {
    return;
  }

  // @ts-ignore
  const { localizedMessage, messageList = [], message } = data;

  const text = localizedMessage || message || messageList.map((msg) => msg.body).join('\n');
  if (isNotEmpty(text)) {
    GlobalToast.show({ text, duration: 5000 });
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

  return chain.proceed(requestParams).then(async (resp: HttpResponse) => {
    const { success, headers = {}, data } = resp;
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
