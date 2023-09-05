import { API } from '@/http/api-types';
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

type TypeOfList<T> = (params?: ParamType, options?: Record<string, any>) => Promise<API.TableDataInfo<T>>;
type TypeOfGet<T> = (id: React.Key) => Promise<T>;
type TypeOfSave = (data: Record<string, any>) => Promise<any>;
type TypeOfUpdate = (data: Record<string, any>) => Promise<any>;
type TypeOfRemove = (id: React.Key, options?: Record<string, any>) => Promise<any>;
type TypeOfSearch = (params: ParamType, options?: Record<string, any>) => Promise<any>;

export type BizResourceType<T> = {
  list: TypeOfList<T>;
  get: TypeOfGet<T>;
  save: TypeOfSave;
  update: TypeOfUpdate;
  remove: TypeOfRemove;
  exportData: TypeOfSearch;
  importData: TypeOfSearch;
  resourceLike: ResourceLike;
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
  const save: ActionLike = {
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
    save,
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

function _getResource<T>(resource) {
  const resourceLike: ResourceLike = toResource(resource);
  const send = async (action, data, option = {}) => {
    const url = ActionUtil.getActionUri(action);
    return await Q.send(url, { data, method: action.method, ...option });
  };

  const list: TypeOfList<T> = async (data, options = {}) => {
    const resp = await send(resourceLike.list, data, {
      params: {
        pageNum: data?.current,
        pageSize: data?.pageSize,
      },
      ...options,
    });
    return {
      ...resp,
      total: resp.total as any,
      current: data?.current,
      pageSize: data?.pageSize,
      success: true,
    };
  };

  const get: TypeOfGet<T> = async (id) => {
    const resp = await send(resourceLike.get, { id });
    return resp.data;
  };

  const save = async (data: Record<string, any>) => send(resourceLike.save, data);
  const update = async (data: Record<string, any>) => send(resourceLike.update, data);
  const remove = async (id: React.Key, options?: Record<string, any>) => send(resourceLike.remove, { id }, options);
  const exportData: TypeOfSearch = async (params, options) => send(resourceLike.exportData, {}, options);
  const importData: TypeOfSearch = async (params, options) => send(resourceLike.importData, {}, options);

  return {
    list,
    get,
    save,
    update,
    remove,
    exportData,
    importData,
    resourceLike,
  };
}

export const getResource: <T = any>(resource: string | ActionLike | ResourceLike) => BizResourceType<T> = <T>(
  resource,
) => {
  return _getResource<T>(resource);
};
export const useResource: <T = any>(resource: string | ActionLike | ResourceLike) => BizResourceType<T> = <T>(
  resource,
) => getResource<T>(resource);

export default useResource;
