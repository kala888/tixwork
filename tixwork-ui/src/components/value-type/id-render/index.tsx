import ObjectLink from '@/components/value-type/object/object-link';
import _ from 'lodash';
import { ProFormText } from '@ant-design/pro-form';

const IdRender = {
  align: 'center',
  render: (text, props) => {
    const { fieldProps } = props;
    return <ObjectLink displayName={text} id={text} {...fieldProps} />;
  },
  renderFormItem: (__, props) => {
    const rest = _.omit(props.fieldProps, 'objectType');
    return (
      <ProFormText formItemProps={{ className: 'customized-form-item' }} width="sm" {...rest} />
    );
  },
};
export default IdRender;
