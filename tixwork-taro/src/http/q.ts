import HttpRequest from './http-request';

const request = HttpRequest.request;

type RequestOptionType = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH';
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

const get: RequestType = async (url = '', params = {}, options = {}) => {
  const resp = await request(url, {
    method: 'GET',
    params,
    ...(options || {}),
  });
  return resp.data;
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
const post: RequestType = async (url = '', data = {}, options = {}) => {
  const { asParams, ...rest } = options || {};
  const theOptions = {
    data,
    ...rest,
    method: 'POST',
  };
  if (asParams) {
    theOptions.params = data;
  }
  const resp = await request(url, theOptions);
  return resp.data;
};

/**
 * 参考 POST
 * @param url
 * @param data
 * @param options
 */
const put: RequestType = async (url = '', data = {}, options = {}) => {
  const { asParams, ...rest } = options || {};
  const theOptions = {
    method: 'PUT',
    data,
    ...rest,
  };
  if (asParams) {
    theOptions.params = data;
  }
  const resp = await request(url, theOptions);
  return resp.data;
};

const remove: RequestType = async (url = '', data = {}, options = {}) => {
  const resp = await request(url, {
    method: 'DELETE',
    data,
    ...(options || {}),
  });
  return resp.data;
};

/**
 * 暴露request出去，例如使用Delete的时候可以用这个.
 * <b>注意只有两个参数</b>
 * @param url
 * @param options
 */
const send: SendRequestType = async (url = '', options = {}) => {
  const resp = await request(url, options);
  return resp.data;
};

/**
 * 为啥叫Q，应为比R（request）更Q
 */
const Q = {
  get,
  post,
  put,
  remove,
  send,
  Get: get,
  Post: post,
  Put: put,
  Send: send,
};

export default Q;
