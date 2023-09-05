import ObjectUtils from '@/utils/object-utils';
import type { AxiosResponse } from '@@/plugin-request/request';
import { notification } from 'antd';
import _ from 'lodash';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '创建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行创建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const isExceptionXClass = (xClass) => _.endsWith(_.toLower(xClass), 'exception');

const showInfo = _.throttle(
  (description) => {
    notification.warning({
      message: '提示',
      description,
    });
  },
  5000,
  { leading: true, trailing: false },
);

const showError = _.throttle(
  (description) => {
    notification.error({
      message: '出错啦！！',
      description,
    });
  },
  5000,
  { leading: true, trailing: false },
);

const getHeaders = (response) => {
  const headers = {};
  Object.keys(response.headers || []).forEach((key) => {
    headers[key.toLowerCase()] = response.headers[key];
  });
  return headers;
};
const ErrorResponseInterceptors = (response: AxiosResponse) => {
  const headers = getHeaders(response);
  const xClass = headers['x-class'];
  const resp = response.data;
  if (response.status === 200 && isExceptionXClass(xClass)) {
    showInfo(resp.msg);
  }
  return response;
};

export const ErrorHandler = async (error: any, opts: any) => {
  if (opts?.skipErrorHandler) {
    throw error;
  }
  const { response } = error;
  //1. 如果没网
  if (!response) {
    showError('您的网络发生异常，无法连接服务器');
    throw error;
  }
  if (response.status === 401) {
    showInfo('登录已过期，请重新登录。');
    return;
  }

  const headers = getHeaders(response);
  const xClass = headers['x-class'];
  if (isExceptionXClass(xClass)) {
    let message = response.data?.msg;

    if (opts.responseType === 'arraybuffer') {
      const enc = new TextDecoder('utf-8');
      const theResponse = ObjectUtils.parseToObject(enc.decode(new Uint8Array(response.data)));
      message = theResponse.msg;
    }
    if (opts.responseType === 'blob') {
      const blob = new Blob([error.response.data], { type: 'application/json' });
      message = ObjectUtils.parseToObject(await blob.text()).msg;
    }
    showError(message);
    throw error;
  }

  //3. 展示配置的Exception
  if (response.status) {
    const { status, statusText, url } = response;
    console.error('url got error', url, response);
    const errorDescription = response?.msg || response.data?.msg || codeMessage[status] || statusText;
    showError(errorDescription);
  }

  throw error;
};

export default ErrorResponseInterceptors;
