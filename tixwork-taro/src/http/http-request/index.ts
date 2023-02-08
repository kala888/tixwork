import RequestUrlProcessor from './request-url-processor';
import RequestAuthProcessor from './request-auth-processor';
import loadingAndLogsProcessor from './loading-and-logs-processor';
import customProcessor from './custom-processor';
import Taro from '@tarojs/taro';
import { API } from '@/http/api-types';

type RequestFunction = <R = any>(url: string, options?: Record<string, any>) => Promise<API.WebResult<R>>;

const interceptors = [
  RequestUrlProcessor,
  RequestAuthProcessor,
  loadingAndLogsProcessor,
  customProcessor,
  Taro.interceptors.logInterceptor,
];

interceptors.forEach((interceptorItem) => Taro.addInterceptor(interceptorItem));

const request: RequestFunction = async (url, options) => {
  const resp = await Taro.request({
    ...options,
    url,
  });
  return resp as unknown as API.WebResult; //这个responseData是接口返回的直接数据, 如果是WebResult，里面还一个data
};

const HttpRequest = { request };

export default HttpRequest;
