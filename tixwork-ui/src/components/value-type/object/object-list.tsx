import ObjectLink from '@/components/value-type/object/object-link';
import ObjectListPicker from '@/components/value-type/object/object-list-picker';
import ObjectUtils from '@/utils/object-utils';
import { Divider, Space } from 'antd';

export const ObjectListValueType = {
  render: (items, props) => {
    const { fieldProps } = props;
    // return <ObjectListTable {...fieldProps} value={item} readOnly />;
    const { empty } = fieldProps;
    if (ObjectUtils.isEmpty(items) && ObjectUtils.isNotEmpty(empty)) {
      return empty;
    }
    return (
      <Space size={0} split={<Divider type="vertical" style={{ background: '#ddd' }} />} wrap>
        {items.map((it) => (
          <ObjectLink {...fieldProps} key={it.id} record={it} />
        ))}
      </Space>
    );
  },
  renderFormItem: (__, props) => {
    const { fieldProps } = props;
    return <ObjectListPicker {...props} {...fieldProps} />;
  },
};
