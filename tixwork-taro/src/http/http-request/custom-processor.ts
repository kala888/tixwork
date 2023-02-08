import _ from 'lodash';
import { Chain } from '@tarojs/taro';
import { API } from '@/http/api-types';
import MockService from '@/http/mock-service';

type TaroResponse = {
  cookies: any[];
  data: any;
  errMsg: string;
  header: Record<string, any>;
  statusCode: number;
};

const systemErrorXClass = 'NetworkException.RetryPage';

const formatHeaders = (header) => {
  const responseHeaders = {};
  _.keys(header).map((key) => {
    responseHeaders[key.toLocaleLowerCase()] = header[key];
  });
  return responseHeaders;
};

const CustomProcessor = async (chain: Chain) => {
  const { headers: requestHeaders, ...others } = chain.requestParams;

  // // mock 数据处理
  const mockData = MockService.getMockResp(others.url);
  if (mockData) {
    return mockData;
  }

  try {
    // // 注意request 中使用 header，在应用中使用的是headers，
    const resp: TaroResponse = await chain.proceed({ ...others, header: requestHeaders });

    // 注意这里的taro 原生的http中使用的header是就叫header，其实是headers
    const headers = formatHeaders(resp.header);

    const xClass = _.get(headers, 'x-class', '');
    const xNavigationMethod = _.get(headers, 'x-navigation-method', '');
    let responseData: { data: any } = resp.data;

    const isNotJsonObject = !_.isObjectLike(responseData);
    if (isNotJsonObject) {
      responseData = { data: responseData };
      console.error(
        'response should be json, but it\'s string, please contact interface developer, tell him "Change it!!"'
      );
    }

    if (_.isNil(responseData.data)) {
      responseData = { data: responseData };
    }
    // 接口返回的数据response的body是对象，并且xClass不是Exception结尾，那么应该就是正常
    const success = !isNotJsonObject && !xClass.endsWith('Exception');
    // 无论后台接口如何，统计包装成WeResult
    const result: API.WebResult = {
      msg: 'not fond in response',
      code: success ? 200 : 520,
      ...responseData,
      responseOptions: {
        xClass,
        xNavigationMethod,
        headers,
        success,
      },
    };
    return result;
  } catch (error) {
    const { errMsg } = error;
    console.error('Request error', error);
    return {
      xClass: systemErrorXClass,
      msg: `error code:${errMsg}`,
      code: 521,
      ...(error.response || {}),
    };
  }
};

export default CustomProcessor;
