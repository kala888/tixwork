import Config from '@/utils/config';
import type { RequestConfig } from 'umi';

import RequestAuth from './request-auth';
import RequestUrl from './request-url';

import ErrorResponseInterceptors, { ErrorHandler } from './response-error';
import ResponseLog from './response-log';
import ResponseToast from './response-toast';

export const requestConfig: RequestConfig = {
  baseURL: process.env.NODE_ENV === 'production' ? Config.baseURL : '',
  withCredentials: true,
  errorConfig: {
    errorHandler: ErrorHandler,
  },
  requestInterceptors: [RequestUrl, RequestAuth],
  responseInterceptors: [ResponseLog, ErrorResponseInterceptors, ResponseToast],
};

// adaptor: (resData, ctx) => {
//   const success = !_.endsWith(_.toLower(resData.xClass), 'exception');
//   console.log('ctx.res', ctx, resData);
//   return {
//     ...resData,
//     success,
//     errorMessage: resData.msg,
//   };
// },
