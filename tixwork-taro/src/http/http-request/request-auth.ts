import _ from 'lodash';
import ObjectUtils from '@/utils/object-utils';
import AuthTools from '@/utils/auth-tools';
import { Chain } from '@tarojs/taro';
import Config from '@/utils/config';

const RequestAuth = async (chain: Chain) => {
  const token = await AuthTools.getTokenAsync();
  const { requestParams } = chain;
  const { headers = {} } = requestParams;
  //1. 往header中添加token
  const theParam: any = {
    ...requestParams,
    headers: {
      ...headers,
      Authorization: 'Bearer ' + token,
      clientid: Config.clientId,
    },
    credentials: 'omit',
  };

  //2. 后调
  const resp: API.CustomResponse = await chain.proceed(theParam);

  //3. 返回结果，保存token
  const authorization = _.get(resp, 'headers.authorization', '');
  if (ObjectUtils.isNotEmpty(authorization)) {
    await AuthTools.saveTokenAsync(authorization);
  }
  return resp;
};

export default RequestAuth;
