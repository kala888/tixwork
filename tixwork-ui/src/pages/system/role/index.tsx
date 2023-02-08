import EleTableList from '@/components/ele-table-list/ele-table-list';
import BasePage from '@/components/layout/base-page';
import SplitPanel from '@/components/split-panel/split-panel';
import type { EleValueType } from '@/components/value-type';
import CommonColumn from '@/components/value-type/common-column';
import ApiConfig from '@/http/api-config';
import useResource from '@/http/use-resource';
import type { ProColumnType } from '@ant-design/pro-components';
import { Spin } from 'antd';
import { useState } from 'react';
import Detail from './detail';
import EditForm from './edit-form';

const columns: ProColumnType<API.Role, EleValueType>[] = [
  {
    title: '角色名',
    dataIndex: 'roleName',
    valueType: 'NickName',
  },
  {
    title: '权限标识',
    valueType: 'text',
    dataIndex: 'roleKey',
  },
  CommonColumn.status,
];

export default () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.Role>({} as any);

  const api = useResource<API.Role>(ApiConfig.role);

  const handleRowSelect = async (record) => {
    setLoading(true);
    const item = await api.get(record.roleId);
    setCurrentRow(item);
    setLoading(false);
  };

  return (
    <BasePage>
      <SplitPanel style={{ height: '100%' }} leftWidth={450}>
        <EleTableList<API.Role>
          title="角色管理"
          resource={ApiConfig.role}
          rowKey={'roleId'}
          columns={columns}
          search={false}
          options={false}
          pagination={false}
          onRowSelect={handleRowSelect}
          editForm={EditForm}
        />

        <Spin spinning={loading}>
          <Detail item={currentRow} />
        </Spin>
      </SplitPanel>
    </BasePage>
  );
};
