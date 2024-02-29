import RequestUrl from './request-url';
import RequestAuth from './request-auth';
import customProcessor from './custom-processor';
import Taro from '@tarojs/taro';
import ResponseLog from '@/http/http-request/request-loading-log';
import ResponseError from './response-error';
import ResponseToastPopup from '@/http/http-request/response-toast-popup';

type RequestFunction = <R = any>(url: string, options?: Record<string, any>) => Promise<API.CustomResponse<R>>;

const interceptors = [
  RequestUrl,
  RequestAuth,
  ResponseToastPopup,
  ResponseError,
  ResponseLog,
  customProcessor,
  Taro.interceptors.logInterceptor,
];

interceptors.forEach((interceptorItem) => Taro.addInterceptor(interceptorItem));

const request: RequestFunction = async (url, options) => {
  const resp = await Taro.request({
    ...options,
    url,
  });
  return resp as unknown as API.CustomResponse; //这个responseData是接口返回的直接数据, 如果是WebResult，里面还一个data
};

const HttpRequest = { request };

export default HttpRequest;
