import type { RemoteOptionType } from '@/services/use-remote-option';
import useRemoteOption from '@/services/use-remote-option';
import ObjectUtils from '@/utils/object-utils';
import type { ProFormRadioGroupProps } from '@ant-design/pro-components';
import { ProFormRadio } from '@ant-design/pro-components';

type RemoteRadioType = {
  name: string;
} & RemoteOptionType &
  ProFormRadioGroupProps;
/**
 * 根据types，或者linkToUrl来获取candidate values
 */
const RemoteRadio = (props: RemoteRadioType) => {
  const { data } = useRemoteOption(props);
  if (ObjectUtils.isEmpty(data)) {
    return null;
  }
  return (
    <ProFormRadio.Group
      formItemProps={{ className: 'customized-form-item' }}
      fieldProps={{ buttonStyle: 'solid' }}
      options={data}
      // @ts-ignore
      valueType="radioButton"
      {...props}
    />
  );
};

export default RemoteRadio;
