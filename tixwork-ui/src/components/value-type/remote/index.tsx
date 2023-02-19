import ProStatus from '@/components/pro-status';

import RemoteCascade from '@/components/form/remote/remote-cascade';
import RemoteRadio from '@/components/form/remote/remote-radio';
import RemoteSelect from '@/components/form/remote/remote-select';
import useRemoteOption from '@/services/use-remote-option';

const RemoteOptionStatus = (props) => {
  const { data } = useRemoteOption(props);
  return <ProStatus options={data} {...props} />;
};

export const RemoteEnumValueType = {
  render: (dom, entity) => <RemoteOptionStatus {...entity} {...entity.fieldProps} value={dom} />,
  renderFormItem: (__, props) => <RemoteSelect {...props} {...props.fieldProps} />,
};

export const RemoteRadioValueType = {
  render: (dom, entity) => <RemoteRadio {...entity} {...entity.fieldProps} value={dom} readonly />,
  renderFormItem: (__, props) => <RemoteRadio {...props} {...props.fieldProps} />,
};

/**
 * fieldProps:{
 *   names:["province","city"],
 *   joinBy:'-',
 *   linkToUrl: 'xxxx' //remote返回candidateValues
 * }
 */
export const RemoteCascadeValueType = {
  //bug，设置了dataIndex，当值为空的时候，不被调用，
  // 只设置key，绕过去。https://github.com/ant-design/pro-components/issues/6294
  render: (item, props) => {
    const { fieldProps = {} } = props;
    const { joinBy = '-', names = [] } = fieldProps;
    const value = names.map((it) => item![it]).join(joinBy);
    return <span>{value}</span>;
  },
  renderFormItem: (__, props) => <RemoteCascade {...props} {...props.fieldProps} />,
};
