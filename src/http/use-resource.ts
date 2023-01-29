import Query from './query';
import ActionUtil from '@/utils/action-util';
import type React from 'react';
import { ActionLike } from '@/nice-router/nice-router-types';

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

type TypeOfList<T> = (params?: ParamType, options?: Record<string, any>) => Promise<TableList<T>>;
type TypeOfGet<T> = (id: React.Key) => Promise<T>;
type TypeOfUpdate = (data: Record<string, any>) => Promise<any>;
type TypeOfRemove = (id: React.Key, options?: Record<string, any>) => Promise<any>;
type TypeOfSearch = (params: ParamType, options?: Record<string, any>) => Promise<any>;

export type BizResourceType<T> = {
  list: TypeOfList<T>;
  get: TypeOfGet<T>;
  add: TypeOfUpdate;
  update: TypeOfUpdate;
  remove: TypeOfRemove;
  exportData: TypeOfSearch;
  importData: TypeOfSearch;
};

export function getResource<T>(resource: string | ActionLike): BizResourceType<T> {
  const uri = ActionUtil.getActionUri(resource);
  // @ts-ignore
  const method = resource?.method || 'POST';

  const list: TypeOfList<T> = async (params, options) => {
    const listUrl = uri + '/list';
    const resp = await Query.send(listUrl, {
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

  const get: TypeOfGet<T> = async (id) => {
    const getUrl = uri + '/' + id;
    const resp = await Query.get(getUrl);
    return resp.data;
  };

  const add = async (data: Record<string, any>) => Query.post(uri, data);
  const update = async (data: Record<string, any>) => Query.put(uri, data);

  const remove = async (id: React.Key, options?: Record<string, any>) => {
    return Query.send(uri + '/' + id, {
      method: 'DELETE',
      ...(options || {}),
    });
  };

  const exportData: TypeOfSearch = async (params, options) => await Query.get(uri + '/export', params, options);
  const importData: TypeOfSearch = async (params, options) => await Query.post(uri + '/import', params, options);

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

const useResource = getResource;
export default useResource;
