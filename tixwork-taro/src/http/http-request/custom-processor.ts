import _ from 'lodash';
import { Chain } from '@tarojs/taro';
import MockService from '@/http/mock-service';

type TaroResponse = {
  cookies: any[];
  data: any;
  errMsg: string;
  header: Record<string, any>;
  statusCode: number;
};

const formatHeaders = (header) => {
  const responseHeaders = {};
  _.keys(header).map((key) => {
    responseHeaders[key.toLocaleLowerCase()] = header[key];
  });
  return responseHeaders;
};

const CustomProcessor = async (chain: Chain) => {
  const { headers: requestHeaders, ...others } = chain.requestParams;
  // 1. mock 数据处理
  const mockData = MockService.getMockResp(others.url);
  if (mockData) {
    return mockData;
  }

  try {
    // // 注意request 中使用 header，在应用中使用的是headers，
    const resp: TaroResponse = await chain.proceed({ ...others, header: requestHeaders });
    const { data = {}, statusCode, header } = resp;

    // 注意这里的taro 原生的http中使用的header是就叫header，其实是headers
    const headers = formatHeaders(header);

    const xClass = _.get(headers, 'x-class', '');
    const xNavigationMethod = _.get(headers, 'x-navigation-method');

    const result: API.CustomResponse = {
      msg: 'success',
      statusCode,
      data: data as API.WebResult,
      xClass,
      xNavigationMethod,
      headers,
    };
    // 无论后台接口如何，统计包装成WeResult
    return result;
  } catch (error) {
    const { errMsg } = error;
    console.error('Request error', error);
    const result: API.CustomResponse = {
      msg: errMsg,
      statusCode: error.response?.statusCode || 521,
      data: error.response.data as any,
      // xClass:'xxx',//todo
      // xNavigationMethod//toto
      // headers, //todo
    } as any;
    return result;
  }
};

export default CustomProcessor;
