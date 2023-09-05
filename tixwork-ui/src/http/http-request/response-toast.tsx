import ObjectUtils from '@/utils/object-utils';
import type { AxiosResponse } from '@@/plugin-request/request';
import { message } from 'antd';

const ToastInterceptors = (response: AxiosResponse) => {
  const toast = response.data?.toast || {};
  if (ObjectUtils.isNotEmpty(toast)) {
    const { text, duration = 3000 } = toast;
    message.info(text, duration / 1000);
  }
  return response;
};

export default ToastInterceptors;
