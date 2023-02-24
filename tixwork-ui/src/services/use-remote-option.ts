import { isEmpty, isNotEmpty } from '@/utils/object-utils';
import { request } from '@@/plugin-request/request';
import { useRequest } from 'ahooks';

export type RemoteOptionType = {
  types?: string;
  linkToUrl?: string;
  optionType?: 'enums' | 'dict';
};

/**
 * /api/options/gender  获取enums和字典的值
 */
const getUrl = (props) => {
  const { types, linkToUrl } = props;
  const optionUrl = `/api/options/${types}`;
  return linkToUrl || optionUrl;
};

const transform = (items) => {
  if (isEmpty(items)) {
    return [];
  }
  return items.map((it) => {
    const result: any = {
      label: it.title,
      value: it.id,
    };
    if (isNotEmpty(it.children)) {
      result.children = transform(it.children);
    }
    return result;
  });
};

const useRemoteOption = (props: RemoteOptionType) => {
  const url = getUrl(props);
  const fetchData = async () => {
    const { data = [] } = await request(url);
    const result = transform(data);
    console.log(result);
    return result;
  };
  return useRequest(fetchData, { cacheKey: 'cache-options-' + url });
};

export default useRemoteOption;
