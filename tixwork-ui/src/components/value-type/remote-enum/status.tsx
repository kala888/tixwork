import ProStatus from '@/components/value-type/remote-enum/pro-status';
import { ProFormSelect } from '@ant-design/pro-components';

const Status = {
  render: (dom, entity) => <ProStatus {...entity} {...entity.fieldProps} value={dom} />,
  renderFormItem: (__, props) => {
    const { fieldProps } = props;
    return <ProFormSelect {...props} {...fieldProps} />;
  },
};
export default Status;
