import { ProFormRadio } from '@ant-design/pro-form/es';
import useRemoteOption from './use-remote-option';

/**
 * 根据types，或者linkToUrl来获取candidate values
 */
export const RemoteRadioGroup = (props) => {
  const { data } = useRemoteOption(props);
  console.log('ddddd', data);
  return (
    <ProFormRadio.Group
      fieldProps={{ buttonStyle: 'solid' }}
      options={data}
      valueType="radioButton"
      {...props}
    />
  );
};

const RemoteRadio = {
  render: (dom, entity) => (
    <RemoteRadioGroup {...entity} {...entity.fieldProps} value={dom} readonly />
  ),
  renderFormItem: (__, props) => {
    const { fieldProps } = props;
    return <RemoteRadioGroup {...props} {...fieldProps} />;
  },
};
export default RemoteRadio;
