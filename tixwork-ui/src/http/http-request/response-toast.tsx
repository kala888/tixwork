import { isNotEmpty } from '@/utils/object-utils';
import type { AxiosResponse } from '@@/plugin-request/request';
import { message } from 'antd';

const ToastInterceptors = (response: AxiosResponse) => {
  const toast = response.data?.toast || {};
  if (isNotEmpty(toast)) {
    const { text, duration = 3000 } = toast;
    message.info(text, duration / 1000);
  }
  return response;
};

export default ToastInterceptors;
