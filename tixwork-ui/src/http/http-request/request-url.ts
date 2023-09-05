import _ from 'lodash';
import { compile, parse } from 'path-to-regexp';

const FAKE_HOST = 'https://www.this-is-fake-host.com';

function buildUrl(uri: any, params = {}, data = {}) {
  const theParams = _.cloneDeep(params);
  const theData = _.cloneDeep(data);
  let pathname = uri;
  try {
    const str = pathname.replace('?', '\\?');
    const compiled = compile(str)({ ...params, ...data });
    const match = parse(str);
    match.forEach((item) => {
      const { name } = item as any;
      if (name in theParams) {
        delete theParams[name];
      }
      if (name in theData) {
        delete theData[name];
      }
    });
    pathname = compiled;
  } catch (e) {
    console.warn('解析uri错误, 多半是带":"的替代变量为空了，请尽量避免在url中使用":"', e);
  }

  const urlObj = new URL(pathname, FAKE_HOST);
  const prefix = urlObj.origin === FAKE_HOST ? '' : urlObj.origin;
  return {
    url: prefix + urlObj.pathname + urlObj.search,
    params: theParams,
    data: theData,
  };
}

const RequestUrl = (config) => {
  // 将params 处理成url
  const { url, params, data } = buildUrl(config.url, config?.params, config.data);
  return {
    ...config,
    url,
    params,
    data,
  };
};

export default RequestUrl;
