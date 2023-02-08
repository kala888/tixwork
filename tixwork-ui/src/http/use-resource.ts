import Q from '@/http/http-request/q';
import ActionUtil from '@/utils/action-util';
import type { ActionLike } from '@/utils/nice-router-types';
import type React from 'react';

type ParamType = {
  page?: number;
  size?: number;
  [key: string]: any;
};
type TableList<T> = {
  data: T[];
  success: boolean;
  total: number;
  current?: number;
  pageSize?: number;
};

export default function useResource<T>(resource: string | ActionLike) {
  const uri = ActionUtil.getActionUri(resource);
  // @ts-ignore
  const method = resource?.method || 'POST';

  const list = async (params?: ParamType, options?: Record<string, any>): Promise<TableList<T>> => {
    const listUrl = uri + '/list';
    const resp = await Q.send(listUrl, {
      method: method,
      params: {
        pageNum: params?.current,
        pageSize: params?.pageSize,
      },
      data: params || {},
      ...(options || {}),
    });
    return {
      data: resp.data?.rows,
      success: true,
      total: resp.data?.total,
      current: params?.current,
      pageSize: params?.pageSize,
    };
  };

  const get = async (id: React.Key): Promise<T> => {
    const getUrl = uri + '/' + id;
    const resp = await Q.get(getUrl);
    return resp.data;
  };

  const add = async (data: Record<string, any>) => Q.post(uri, data);
  const update = async (data: Record<string, any>) => Q.put(uri, data);

  const remove = async (id: React.Key, options?: Record<string, any>) => {
    return Q.send(uri + '/' + id, {
      method: 'DELETE',
      ...(options || {}),
    });
  };

  const exportData = async (params: ParamType, options?: Record<string, any>) => {
    return Q.get(uri + '/export', params, options);
  };

  const importData = async (params: ParamType, options?: Record<string, any>) => {
    return Q.post(uri + '/import', params, options);
  };

  return {
    list,
    get,
    add,
    update,
    remove,
    exportData,
    importData,
  };
}
