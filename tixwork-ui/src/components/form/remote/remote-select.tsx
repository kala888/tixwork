import type { RemoteOptionType } from '@/services/use-remote-option';
import useRemoteOption from '@/services/use-remote-option';
import type { ProFormSelectProps } from '@ant-design/pro-components';
import { ProFormSelect } from '@ant-design/pro-components';

type RemoteSelectType = RemoteOptionType & ProFormSelectProps;

/**
 * 根据types，或者linkToUrl来获取candidate values
 */
export const RemoteSelect = (props: RemoteSelectType) => {
  const { data } = useRemoteOption(props);
  return (
    <ProFormSelect
      formItemProps={{ className: 'customized-form-item' }}
      options={data}
      {...props}
    />
  );
};
export const RemoteEnum = RemoteSelect;
export default RemoteSelect;
