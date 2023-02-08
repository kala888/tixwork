import ObjectLink from '@/components/value-type/object/object-link';
import ObjectPicker from '@/components/value-type/object/object-picker';
import _ from 'lodash';

const Object = {
  render: (item, props) => {
    const { fieldProps } = props;
    const obj = _.isObject(item) ? item : ({ displayName: item } as any);
    return <ObjectLink {...obj} {...fieldProps} />;
  },
  renderFormItem: (__, props) => {
    const { fieldProps } = props;
    return <ObjectPicker {...props} {...fieldProps} />;
  },
};
export default Object;
