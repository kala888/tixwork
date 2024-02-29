import GlobalToast from '@/components/global-popup/global-toast';
import _ from 'lodash';
import Taro from '@tarojs/taro';

const showInfo = (message: any) => {
  const text = message?.text || message?.msg || message;
  GlobalToast.show({ text, duration: 5000 });
};

const isExceptionXClass = (xClass) => _.endsWith(_.toLower(xClass), 'exception');

const ResponseError = async (chain) => {
  const { requestParams } = chain;
  const { silent } = requestParams;
  const resp: API.CustomResponse = await chain.proceed(requestParams);
  const { statusCode, data, xClass } = resp;

  const isNotJsonObject = !_.isObjectLike(data);
  if (isNotJsonObject) {
    console.error(
      'response should be json, but it\'s string, please contact interface developer, tell him "Change it!!"'
    );
  }

  const hasError = statusCode !== 200 || isExceptionXClass(xClass) || !_.isObjectLike(data);
  if (statusCode === 200 && isExceptionXClass(xClass) && !silent) {
    showInfo(resp?.data?.msg || resp?.msg);
  }
  if (statusCode === 401 && !silent) {
    if (!silent) {
      showInfo('登录已过期，请重新登录。');
      Taro.navigateTo({
        url: '/pages/login/login-page',
      });
    }
  }

  if (hasError && !silent) {
    showInfo(resp?.data?.msg || resp?.msg);
  }
  if (hasError) {
    throw new Error(resp.msg);
  }
  return {
    ...resp,
    success: !hasError,
  };
};

export default ResponseError;
