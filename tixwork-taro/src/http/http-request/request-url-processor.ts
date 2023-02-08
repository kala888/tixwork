import { isNotEmpty } from '@/utils/object-utils';
import _ from 'lodash';
import { compile, parse } from 'path-to-regexp';
import { Chain } from '@tarojs/taro';
import Config from '@/utils/config';

function replaceUrl(source: any, params = {}) {
  const finalParams = _.cloneDeep(params);
  let url = source;
  let domain = '';
  if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
    [domain] = url.match(/[a-zA-z]+:\/\/[^/]*/);
    url = url.slice(domain.length);
  }

  const toPath = compile(url);
  try {
    url = toPath(finalParams);
  } catch (e) {
    console.warn('解析uri错误, 多半是带":"的替代变量为空了，请尽量避免在url中使用":"', e);
  }
  const match = parse(url);
  match.forEach((item) => {
    // @ts-ignore
    const { name } = item;
    if (name in finalParams) {
      delete finalParams[name];
    }
  });

  const prefix = isNotEmpty(domain) ? domain : Config.baseURL;
  return {
    url: prefix + url,
    params: finalParams,
  };
}

const RequestUrlProcessor = async (chain: Chain) => {
  const { requestParams } = chain;

  // 将params 处理成url
  const { url: paramUrl, params } = replaceUrl(requestParams.url, requestParams?.params);
  // 将data 处理成url
  const { url, params: data } = replaceUrl(paramUrl, requestParams?.data);

  const nextParams = {
    ...requestParams,
    url,
    params,
    data,
  };
  return chain.proceed(nextParams);
};

export default RequestUrlProcessor;
