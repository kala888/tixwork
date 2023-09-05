import type { RequestType } from '@/http/http-request/q';
import Q from '@/http/http-request/q';
import ObjectUtils from '@/utils/object-utils';
import { useRequest } from 'ahooks';

const useHttp = <T>(linkToUrl: string, params?: Record<string, any>, method?: 'GET' | 'POST' | 'PUT') => {
  const fetchData = async () => {
    if (ObjectUtils.isEmpty(linkToUrl)) {
      console.warn('use http linkToUrl不能为空');
      return {
        data: {},
        loading: false,
      } as any;
    }
    let http: RequestType;
    switch (method) {
      case 'POST':
        http = Q.post;
        break;
      case 'PUT':
        http = Q.put;
        break;
      default:
        http = Q.get;
    }
    const resp = await http<T>(linkToUrl, params);
    return resp.data;
  };
  return useRequest<T, any>(fetchData, { cacheKey: 'cache-get-req' + linkToUrl });
};
export const useGet = <T>(linkToUrl: string, params?: Record<string, any>) => useHttp<T>(linkToUrl, params, 'GET');
export const usePost = <T>(linkToUrl: string, params?: Record<string, any>) => useHttp<T>(linkToUrl, params, 'POST');
export const usePut = <T>(linkToUrl: string, params?: Record<string, any>) => useHttp<T>(linkToUrl, params, 'PUT');
