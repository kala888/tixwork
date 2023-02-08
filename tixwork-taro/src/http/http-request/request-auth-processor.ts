import _ from 'lodash';
import { isNotEmpty } from '@/utils/object-utils';
import AuthTools from '@/utils/auth-tools';
import { Chain } from '@tarojs/taro';

const RequestAuthProcessor = async (chain: Chain) => {
  const token = await AuthTools.getTokenAsync();
  const { requestParams } = chain;
  const { headers = {} } = requestParams;
  const theParam: any = {
    ...requestParams,
    headers: {
      ...headers,
      Authorization: token,
    },
    credentials: 'omit',
  };
  return chain.proceed(theParam).then(async (theData) => {
    const authorization = _.get(theData, 'headers.authorization', '');
    if (isNotEmpty(authorization)) {
      await AuthTools.saveTokenAsync(authorization);
    }
    return theData;
  });
};

export default RequestAuthProcessor;
