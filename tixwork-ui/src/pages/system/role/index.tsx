import { OptionAction } from '@/components/action/more-option-action';
import BasePage from '@/components/layout/base-page';
import SplitCard from '@/components/split-card';
import TableList from '@/components/table-list';
import { TableListApi } from '@/components/table-list/table-list-types';
import type { EleValueType } from '@/components/value-type';
import CommonColumn from '@/components/value-type/common-column';
import ApiConfig from '@/http/api-config';
import type { API } from '@/http/api-types';
import useResource from '@/http/use-resource';
import type { ProColumnType } from '@ant-design/pro-components';
import { Spin } from 'antd';
import { useRef, useState } from 'react';
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
  const ref = useRef<TableListApi<any>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.Role>({} as any);
  const api = useResource<API.Role>(ApiConfig.role);
  const handleRowSelect = async (record) => {
    setLoading(true);
    const item = await api.get(record.id);
    setCurrentRow(item);
    setLoading(false);
  };

  const isDisabled = (record) => record.superAdmin || record.roleKey === 'admin';

  const lineActionList = [
    {
      code: 'edit',
      render: (record) => (
        <OptionAction title="编辑" onClick={() => ref.current?.edit(record)} disabled={isDisabled(record)} />
      ),
    },
    {
      code: 'remove',
      render: (record) => (
        <OptionAction
          level={'danger'}
          title="删除"
          onClick={() => ref.current?.remove(record)}
          disabled={isDisabled(record)}
        />
      ),
    },
  ];

  return (
    <BasePage>
      <SplitCard sliderWidth={450} style={{ minHeight: '80vh' }}>
        <TableList<API.Role>
          title="角色管理"
          ref={ref}
          resource={ApiConfig.role}
          columns={columns}
          search={false}
          options={false}
          pagination={false}
          onRowSelect={handleRowSelect}
          editForm={EditForm}
          lineActionList={lineActionList}
        />
        <Spin spinning={loading}>
          <Detail item={currentRow} />
        </Spin>
      </SplitCard>
    </BasePage>
  );
};
