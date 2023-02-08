import type { FieldSearchOptionType } from '@/components/value-type/object/field-search';
import { guessTitle } from '@/utils';
import { ProTable } from '@ant-design/pro-components';
import { Typography } from 'antd';

type ObjectInfoListType = {
  items;
  onSelect: (item: any) => void;
  searchedField: FieldSearchOptionType;
};

export default function ObjectInfoList(props: ObjectInfoListType) {
  const { items, onSelect, searchedField } = props;

  const handleClick = (row) => {
    if (onSelect) {
      onSelect(row);
    }
  };
  const extColumn =
    searchedField?.fieldName !== 'displayName'
      ? {
          title: searchedField.fieldLabel,
          dataIndex: searchedField.fieldName,
        }
      : {};

  const columns = [
    {
      title: '名称',
      dataIndex: 'displayName',
      render: (__, record) => guessTitle(record),
    },
    extColumn,
    {
      title: '',
      valueType: 'option',
      width: 100,
      render: (__, record) => (
        <Typography.Link onClick={() => handleClick(record)}>选择</Typography.Link>
      ),
    },
  ];

  return (
    <div style={{ height: '60vh' }}>
      <ProTable
        onRow={(record) => {
          return {
            onClick: () => handleClick(record),
          };
        }}
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
}
