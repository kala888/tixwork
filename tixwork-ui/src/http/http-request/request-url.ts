import Config from '@/utils/config';
import { isEmpty } from '@/utils/object-utils';
import _ from 'lodash';
import { compile, parse } from 'path-to-regexp';

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

  return {
    url: isEmpty(domain) ? url : Config.baseURL + url,
    params: finalParams,
  };
}

const RequestUrl = (config) => {
  // 将params 处理成url
  const { url: paramUrl, params } = replaceUrl(config.url, config?.params);
  // 将data 处理成url
  const { url, params: data } = replaceUrl(paramUrl, config?.data);

  return {
    ...config,
    url,
    params,
    data,
  };
};

export default RequestUrl;
