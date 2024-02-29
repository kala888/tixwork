import Taro from '@tarojs/taro';
import { isWeapp } from '@/utils';
import GlobalLoading from '@/components/global-popup/global-loading';
import LoadingType from '@/nice-router/loading-type';

const showLoading = async (loading: LoadingType) => {
  if (loading === LoadingType.Modal) {
    await GlobalLoading.showLoadingModal();
  }
  if (isWeapp() && loading === LoadingType.BarLoading) {
    Taro.showNavigationBarLoading();
  }
};

async function hideLoading(loading: LoadingType) {
  if (loading === LoadingType.Modal) {
    GlobalLoading.hideLoadingModal();
  }
  if (isWeapp() && loading === LoadingType.BarLoading) {
    Taro.hideNavigationBarLoading();
  }
}

const ResponseLog = async (chain) => {
  const { requestParams } = chain;
  const { loading } = requestParams;
  await showLoading(loading);
  const resp: API.CustomResponse = await chain.proceed(requestParams);
  const { data, headers = {} } = resp;

  console.log('%c****************************', 'color:#40aad8');
  console.log('%c*  request Option:', 'color:#40aad8', requestParams);
  console.log('');
  console.log('%c*  X-Class:', 'color:#40aad8', headers['x-class']);
  console.log('%c*  X-Env-Type:', 'color:#40aad8', headers['x-env-type']);
  console.log('%c*  JSON Data:', 'color:#40aad8', data);
  console.log('%c****************************', 'color:#40aad8');

  await hideLoading(loading);
  return resp;
};

export default ResponseLog;
