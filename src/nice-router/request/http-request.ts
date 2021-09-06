import Taro from '@tarojs/taro';
import AuthTokenProcessor from './auth-token-processor';
import customProcessor from './custom-processor';
import loadingAndLogsProcessor from './loading-and-logs-processor';
import OptionsProcessor from './options-processor';

type HttpRequestProps = {
  //TODO
};
export type HttpResponseProps = {
  headers?: {};
};

const interceptors = [
  OptionsProcessor,
  AuthTokenProcessor,
  loadingAndLogsProcessor,
  customProcessor,
  Taro.interceptors.logInterceptor,
];

interceptors.forEach((interceptorItem) => Taro.addInterceptor(interceptorItem));

class httpRequest {
  async send(options: HttpRequestProps = {}, loading): Promise<HttpResponseProps> {
    console.log('http-request options', options);
    // @ts-ignore
    return Taro.request({ ...options, loading });
  }
}

export default new httpRequest();
