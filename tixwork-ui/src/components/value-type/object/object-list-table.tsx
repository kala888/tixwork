import { ProCard, ProTable } from '@ant-design/pro-components';
import { Typography } from 'antd';
import _ from 'lodash';

import ObjectUtils from '@/utils/object-utils';
import { v4 as uuidv4 } from 'uuid';

const defaultFields: any[] = [
  {
    dataIndex: 'id',
    title: 'ID',
    valueType: 'IdRender',
    fieldProps: {
      // objectType: 'courseRecord',
    },
  },
  { dataIndex: 'displayName', title: '名称', hideInSearch: true },
];

type ObjectListTableType = {
  value?: any;
  onChange?: (record?: any, all?: any[]) => void;
  fields?: any[];
  readOnly?: boolean;
  objectType?: string;
};

export const ObjectListTable = (props: ObjectListTableType) => {
  const { onChange, fields = defaultFields, readOnly = false, objectType } = props;
  const list = ObjectUtils.parseToArray(props.value).map((it) => ({
    ...it,
    uuid: it.uuid || uuidv4(),
  }));

  if (ObjectUtils.isEmpty(list)) {
    return <ProCard bordered style={{ height: 28 }} />;
  }

  const handleRemove = (record) => {
    const result = list.filter((it) => it.uuid !== record.uuid);
    if (onChange) {
      onChange(record, result);
    }
  };

  let columns: any[] = [...fields];
  if (!readOnly) {
    columns.push({
      title: '',
      valueType: 'option',
      width: 60,
      render: (__, record) => <Typography.Link onClick={() => handleRemove(record)}>移除</Typography.Link>,
    });
  }
  columns = columns.filter((it) => !it.hideInTable);
  const idColumn = columns.find((it) => _.lowerCase(it.dataIndex) === 'id');
  if (ObjectUtils.isEmpty(idColumn?.fieldProps?.objectType) && ObjectUtils.isNotEmpty(objectType)) {
    _.set(idColumn, 'fieldProps.objectType', objectType);
  }

  const dataSource = [...list].map((it, idx) => ({ ...it, rowKey: it.id + '_' + idx }));
  const pagination = dataSource.length >= 10 && {
    pageSize: 10,
  };
  console.log('datasource', dataSource);
  return (
    <ProTable
      size={'small'}
      ghost
      bordered
      dataSource={dataSource}
      columns={columns}
      rowKey="rowKey"
      search={false}
      pagination={pagination}
      options={false}
    />
  );
};
