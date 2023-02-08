import { ProFormSelect } from '@ant-design/pro-components';
import type { ProFormSelectProps } from '@ant-design/pro-form/es/components/Select';
import ProStatus from './pro-status';
import type { RemoteOptionType } from './use-remote-option';
import useRemoteOption from './use-remote-option';

type RemoteSelectType = RemoteOptionType & Partial<ProFormSelectProps>;
/**
 * 根据types，或者linkToUrl来获取candidate values
 */
export const RemoteSelect = (props: RemoteSelectType) => {
  const { data } = useRemoteOption(props);
  return (
    <ProFormSelect
      options={data}
      {...props}
      formItemProps={{ className: 'customized-form-item' }}
    />
  );
};

const RemoteOptionStatus = (props) => {
  const { data } = useRemoteOption(props);
  return <ProStatus options={data} {...props} />;
};

const RemoteEnum = {
  render: (dom, entity) => <RemoteOptionStatus {...entity} {...entity.fieldProps} value={dom} />,
  // render: (dom, entity) => <RemoteSelect {...entity} {...entity.fieldProps} value={dom} readonly />,
  renderFormItem: (__, props) => {
    const { fieldProps } = props;
    console.log('props....', props, fieldProps);
    return <RemoteSelect {...props} {...fieldProps} />;
  },
};
export default RemoteEnum;
