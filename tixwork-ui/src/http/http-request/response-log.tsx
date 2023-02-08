import { isDev } from '@/utils';
import type { AxiosResponse } from '@umijs/max';

const ResponseLog = (response: AxiosResponse) => {
  if (isDev()) {
    console.log('%c****************************', 'color:#40aad8');
    console.log('%c*  request  option :', 'color:#40aad8', response.request.url, response.request);
    console.log('%c*  response data   :', 'color:#40aad8', response.data);
    console.log('%c****************************', 'color:#40aad8');
  }
  return response;
};

export default ResponseLog;
