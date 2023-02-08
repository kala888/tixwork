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

const useRemoteOption = (props: RemoteOptionType) => {
  const url = getUrl(props);
  const fetchData = async () => {
    const { data = [] } = await request(url);
    return data.map((it) => ({ label: it.title, value: it.id }));
  };
  return useRequest(fetchData, { cacheKey: 'cache-options-' + url });
};

export default useRemoteOption;
