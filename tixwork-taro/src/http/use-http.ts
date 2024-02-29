import { useEffect, useState } from 'react';
import ObjectUtils from '@/utils/object-utils';
import Q, { RequestType } from '@/http/q';

function useHttp<T>(linkToUrl: string, params?: any, method?: 'GET' | 'POST' | 'PUT') {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    if (ObjectUtils.isEmpty(linkToUrl)) {
      console.warn('use http linkToUrl不能为空');
      return;
    }
    try {
      setLoading(true);
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
      setData(resp.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData().then();
  }, [linkToUrl]);

  return {
    data,
    loading,
    refresh: fetchData,
  };
}

export function useGet<T>(linkToUrl: string, params?: Record<string, any>) {
  return useHttp<T>(linkToUrl, params, 'GET');
}

export function usePost<T>(linkToUrl: string, params?: Record<string, any>) {
  return useHttp<T>(linkToUrl, params, 'POST');
}

export function usePut<T>(linkToUrl: string, params?: Record<string, any>) {
  return useHttp<T>(linkToUrl, params, 'PUT');
}
