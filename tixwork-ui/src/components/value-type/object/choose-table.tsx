import type { ObjectPickerSearchFieldType } from '@/components/value-type/object/object-picker-field';
import { ProTable } from '@ant-design/pro-components';
import { Typography } from 'antd';

export default ({
  items,
  onSelect,
  fields,
}: {
  items;
  onSelect: (item: any) => void;
  fields: ObjectPickerSearchFieldType[];
}) => {
  const handleClick = (row) => {
    if (onSelect) {
      onSelect(row);
    }
  };
  const columns = [
    ...fields,
    {
      title: '',
      valueType: 'option',
      width: 60,
      render: (__, record) => (
        <Typography.Link onClick={() => handleClick(record)}>选择</Typography.Link>
      ),
    },
  ];

  return (
    <div style={{ height: '60vh' }}>
      <ProTable
        dataSource={items}
        columns={columns}
        rowKey="id"
        search={false}
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
        }}
        options={false}
      />
    </div>
  );
};
