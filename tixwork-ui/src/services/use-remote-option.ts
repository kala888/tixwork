import BizSchema from '@/biz-models/biz-schema';
import Q from '@/http/http-request/q';
import { getResource } from '@/http/use-resource';
import { getDisplayName } from '@/utils';
import ObjectUtils from '@/utils/object-utils';
import { useRequest } from 'ahooks';

export type RemoteOptionType = {
  linkToUrl?: string;
  types?: string;
  objectType?: string;
  isObject?: boolean;
  params?: any;
};

/**
 * /api/options/gender  获取enums和字典的值
 */
const getUrl = (props) => {
  const { types, linkToUrl, objectType } = props;
  if (ObjectUtils.isNotEmpty(linkToUrl)) {
    return linkToUrl;
  }
  if (objectType) {
    const schema = BizSchema.get(objectType);
    return getResource(schema?.linkToUrl).resourceLike?.list?.linkToUrl;
  }
  return `/api/options/${types}`;
};

const transform = (items) => {
  if (ObjectUtils.isEmpty(items)) {
    return [];
  }
  return items.map((it) => {
    const result: any = {
      ...it,
      label: getDisplayName(it),
      value: it.id,
    };
    if (ObjectUtils.isNotEmpty(it.children)) {
      result.children = transform(it.children);
    }
    return result;
  });
};
// 有时候报错。Warning: Can't perform a React state update on a component that hasn't mounted yet. 可以忽略，
// react官方bug，未来会处理掉：https://github.com/reactwg/react-18/discussions/82
const useRemoteOption = (props: RemoteOptionType) => {
  const url = getUrl(props);
  const { params } = props;
  const fetchData = async () => {
    const resp = await Q.post(url, params);
    return transform(resp?.data);
  };
  return useRequest(fetchData, { cacheKey: 'cache-options-' + url });
};

export default useRemoteOption;
