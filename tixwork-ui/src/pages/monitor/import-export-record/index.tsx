import BasePage from '@/components/layout/base-page';
import TableList from '@/components/table-list';
import type { EleValueType } from '@/components/value-type';
import ApiConfig from '@/http/api-config';
import type { ProColumnType } from '@ant-design/pro-components';
import { Typography } from 'antd';

const columns: ProColumnType<any, EleValueType>[] = [
  {
    title: '操作类型',
    dataIndex: 'type',
    valueType: 'RemoteEnum',
    width: 100,
    align: 'center',
    render: (text, record) => (
      <Typography.Text type={record.type === 'EXPORT' ? 'success' : 'danger'} style={{ fontWeight: 500 }}>
        {text}
      </Typography.Text>
    ),
    fieldProps: {
      types: 'ImportExportType',
    },
  },
  {
    title: '文件名',
    dataIndex: 'fileName',
  },
  {
    title: 'MD5',
    dataIndex: 'fileMd5',
    search: false,
    width: 120,
    ellipsis: true,
    copyable: true,
  },
  {
    title: '操作者ID',
    dataIndex: 'operationUserId',
  },
  {
    title: '操作人',
    dataIndex: 'operationUser',
    align: 'center',
  },
  {
    title: '操作结果',
    dataIndex: 'result',
    search: false,
    ellipsis: true,
    width: 300,
  },
  {
    title: '时间',
    dataIndex: 'createTime',
    search: false,
    width: 140,
  },
];

export default () => {
  return (
    <BasePage>
      <TableList
        title="文件导入记录"
        resource={ApiConfig.importExportRecord}
        columns={columns}
        options={false}
        toolBarRender={false}
        lineActionList={[{ code: 'remove' }]}
        actionList={false}
      />
    </BasePage>
  );
};
