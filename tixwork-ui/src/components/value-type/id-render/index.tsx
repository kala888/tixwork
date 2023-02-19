import ObjectLink from '@/components/value-type/object/object-link';
import { ProFormText } from '@ant-design/pro-components';
import _ from 'lodash';

const IdRenderValueType = {
  align: 'center',
  render: (text, props) => {
    const { fieldProps } = props;
    const id = _.get(props?.record, 'id', text);
    return <ObjectLink displayName={text} id={id} {...fieldProps} />;
  },
  renderFormItem: (__, props) => {
    const rest = _.omit(props.fieldProps, 'objectType');
    return (
      <ProFormText formItemProps={{ className: 'customized-form-item' }} width="sm" {...rest} />
    );
  },
};
export default IdRenderValueType;
