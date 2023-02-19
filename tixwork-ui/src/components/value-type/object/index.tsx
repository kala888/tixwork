import ObjectLink from '@/components/value-type/object/object-link';
import ObjectListPicker from '@/components/value-type/object/object-list-picker';
import { ObjectListTable } from '@/components/value-type/object/object-list-table';
import ObjectPicker from '@/components/value-type/object/object-picker';
import _ from 'lodash';

export const ObjectListValueType = {
  render: (item, props) => {
    const { fieldProps } = props;
    console.log('item', item);
    return <ObjectListTable {...fieldProps} value={item} readOnly />;
  },
  renderFormItem: (__, props) => {
    const { fieldProps } = props;
    return <ObjectListPicker {...props} {...fieldProps} />;
  },
};

const ObjectValueType = {
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
export default ObjectValueType;
