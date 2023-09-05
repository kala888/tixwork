import type { API } from '@/http/api-types';
import Config from '@/utils/config';
import { request } from '@umijs/max';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH';

type RequestOptionType = {
  method?: HttpMethod;
  asParams?: any; // 将post、put的参数转化为params提交
  params?: any;
  data?: any;
  headers?: Record<string, any>;
  [key: string]: any;
};

type RequestParamsType = Record<string, any>;

export interface RequestType {
  <R = any>(url: string, data?: RequestParamsType, options?: RequestOptionType): Promise<API.WebResult<R>>;
}

interface SendRequestType {
  <R = any>(url: string, options?: RequestOptionType): Promise<API.WebResult<R>>;
}

const get: RequestType = (url = '', params = {}, options = {}) => {
  return request(url, {
    method: 'GET',
    params,
    ...(options || {}),
  });
};

/**
 * 默认以body方式提交, 如果需要以params方式提交(后台设置POST方式，却用String来或者简单数据)
 *     PutMapping("/updateAvatar")
 *     public AjaxResult updateAvatar(String avatar) {...}
 *
 * 1. 可以使用Get
 * 2. 或者将params放到options中，冗余一份或者设置asParams为true
 * 3. 或者直接用send来组装复杂的对象和params
 *
 * @param url
 * @param data 默认设置到data上
 * @param options
 */
const post: RequestType = (url = '', data = {}, options = {}) => {
  const { asParams, ...rest } = options || {};
  const theOptions = {
    data,
    ...rest,
    method: 'POST',
  };
  if (asParams) {
    theOptions.params = data;
  }
  return request(url, theOptions);
};

/**
 * 参考 POST
 * @param url
 * @param data
 * @param options
 */
const put: RequestType = (url = '', data = {}, options = {}) => {
  const { asParams, ...rest } = options || {};
  const theOptions = {
    method: 'PUT',
    data,
    ...rest,
  };
  if (asParams) {
    theOptions.params = data;
  }
  return request(url, theOptions);
};

const remove: RequestType = (url = '', params = {}, options = {}) => {
  return request(url, {
    method: 'DELETE',
    params,
    ...(options || {}),
  });
};
/**
 * 暴露request出去，例如使用Delete的时候可以用这个.
 * <b>注意只有两个参数</b>
 * @param url
 * @param options
 */
const send: SendRequestType = (url = '', options = {}) => {
  return request(url, options);
};

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
  clientid: Config.clientid,
});

/**
 * 为啥叫Q，应为比R（request）更Q
 */
const Q = {
  get,
  post,
  put,
  send,
  remove,
  authHeader,
  // Get: get,
  // Post: post,
  // Put: put,
  // Send: send,
};

export default Q;
