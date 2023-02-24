import Q from '@/http/http-request/q';
import ActionUtil from '@/utils/action-util';
import type { ActionLike, ResourceLike } from '@/utils/nice-router-types';
import _ from 'lodash';
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

type TypeOfList<T> = (params?: ParamType, options?: Record<string, any>) => Promise<TableList<T>>;
type TypeOfGet<T> = (id: React.Key) => Promise<T>;
type TypeOfAdd = (data: Record<string, any>) => Promise<any>;
type TypeOfUpdate = (data: Record<string, any>) => Promise<any>;
type TypeOfRemove = (id: React.Key, options?: Record<string, any>) => Promise<any>;
type TypeOfSearch = (params: ParamType, options?: Record<string, any>) => Promise<any>;

export type BizResourceType<T> = {
  list: TypeOfList<T>;
  get: TypeOfGet<T>;
  add: TypeOfAdd;
  update: TypeOfUpdate;
  remove: TypeOfRemove;
  exportData: TypeOfSearch;
  importData: TypeOfSearch;
};

class SubUri {
  private readonly uri: any;

  constructor(uri) {
    this.uri = uri;
  }

  getUrl() {
    return this.uri;
  }

  subUrl(sub) {
    const obj = new URL(this.uri, 'http://localhost/');
    const pathname = _.trimEnd(obj.pathname, '/');
    const subPath = _.trimEnd(_.trimStart(sub, '/'), '/');
    return `${pathname}/${subPath}${obj.search}`;
  }
}

function toResource(param) {
  const uri = new SubUri(ActionUtil.getActionUri(param));

  const list: ActionLike = {
    linkToUrl: uri.subUrl('/list'),
    method: 'POST',
  };
  const get: ActionLike = {
    linkToUrl: uri.subUrl('/:id'),
    method: 'GET',
  };
  const add: ActionLike = {
    linkToUrl: uri.getUrl(),
    method: 'POST',
  };
  const update: ActionLike = {
    linkToUrl: uri.getUrl(),
    method: 'PUT',
  };
  const remove: ActionLike = {
    linkToUrl: uri.subUrl('/:id'),
    method: 'DELETE',
  };
  const exportData: ActionLike = {
    linkToUrl: uri.subUrl('/export'),
    method: 'GET',
  };
  const importData: ActionLike = {
    linkToUrl: uri.subUrl('/import'),
    method: 'POST',
  };

  const resource: ResourceLike = {
    list,
    get,
    add,
    update,
    remove,
    exportData,
    importData,
    search: {
      ...list,
    },
  };
  if (_.isObject(param)) {
    _.merge(resource, param);
  }
  return resource;
}

export function getResource<T>(
  theResource: string | ActionLike | ResourceLike,
): BizResourceType<T> {
  const resource: ResourceLike = toResource(theResource);

  const send = async (action, data, option = {}) => {
    const url = ActionUtil.getActionUri(action);
    return await Q.send(url, { data, method: action.method, ...option });
  };

  const list: TypeOfList<T> = async (data, options = {}) => {
    const resp = await send(resource.list, data, {
      params: {
        pageNum: data?.current,
        pageSize: data?.pageSize,
      },
      ...options,
    });
    return {
      data: resp.data?.rows,
      success: true,
      total: resp.data?.total,
      current: data?.current,
      pageSize: data?.pageSize,
    };
  };

  const get: TypeOfGet<T> = async (id) => {
    const resp = await send(resource.get, { id });
    return resp.data;
  };

  const add = async (data: Record<string, any>) => send(resource.add, data);
  const update = async (data: Record<string, any>) => send(resource.update, data);
  const remove = async (id: React.Key, options?: Record<string, any>) =>
    send(resource.remove, { id }, options);
  const exportData: TypeOfSearch = async (params, options) =>
    send(resource.exportData, {}, options);
  const importData: TypeOfSearch = async (params, options) =>
    send(resource.importData, {}, options);

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
