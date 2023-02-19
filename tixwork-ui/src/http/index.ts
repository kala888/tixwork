import ApiConfig from '@/http/api-config';
import type { RequestType } from '@/http/http-request/q';
import Q from '@/http/http-request/q';
import { useRequest } from 'ahooks';

//多个地方共享的就扔这吧

//登录用户信息
export const getProfile = () => Q.get<API.ProfileInfo>(ApiConfig.profile);

// 查询部门下拉树结构
export const getDepartmentTree = () => Q.get<API.Dept>('/api/system/dept/tree');

const useHttp = <T>(
  linkToUrl: string,
  params?: Record<string, any>,
  method?: 'GET' | 'POST' | 'PUT',
) => {
  const fetchData = async () => {
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
export const useGet = <T>(linkToUrl: string, params?: Record<string, any>) =>
  useHttp<T>(linkToUrl, params, 'GET');
export const usePost = <T>(linkToUrl: string, params?: Record<string, any>) =>
  useHttp<T>(linkToUrl, params, 'POST');
export const usePut = <T>(linkToUrl: string, params?: Record<string, any>) =>
  useHttp<T>(linkToUrl, params, 'PUT');
