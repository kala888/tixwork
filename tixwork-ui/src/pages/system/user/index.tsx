import BizSchema from '@/biz-models/biz-schema';
import { OptionAction } from '@/components/action/more-option-action';
import BasePage from '@/components/layout/base-page';
import SplitCard from '@/components/split-card';
import TableList from '@/components/table-list';
import { TableListApi } from '@/components/table-list/table-list-types';
import DeptTree from '@/components/tree/dept-tree';
import ApiConfig from '@/http/api-config';
import type { API } from '@/http/api-types';
import Q from '@/http/http-request/q';
import { App, Space, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import EditForm from './edit-form';

export default () => {
  const { modal, message } = App.useApp();
  const [selectDeptId, setSelectDeptId] = useState<React.Key>();
  const ref = useRef<TableListApi<any>>();

  const handleChangePassword = async (record) => {
    const resp = await Q.get(ApiConfig.resetUserPassword, { userId: record.id });
    modal.success({
      title: '密码重置成功',
      content: (
        <Space direction={'vertical'}>
          <span>请复制保存该密码，只显示一次</span>
          <Typography.Text type={'danger'} copyable={true}>
            {resp.msg}
          </Typography.Text>
        </Space>
      ),
    });
  };

  const unlock = (record) => {
    Q.get(ApiConfig.unlock, { unlock: record.id }).then((resp) => message.success('解除临时锁定'));
  };

  const lineActionList = [
    {
      code: 'changePassword',
      render: (record) => (
        <OptionAction
          level="danger"
          title="重置密码"
          onClick={() => handleChangePassword(record)}
          disabled={record?.id === 1}
        />
      ),
    },
    {
      code: 'change',
      render: (record) => (
        <OptionAction title="编辑" onClick={() => ref.current?.edit(record)} disabled={record?.id === 1} />
      ),
    },
    {
      code: 'unlock',
      render: (record) => <OptionAction level="danger" title="解锁" onClick={unlock} disabled={record?.id === 1} />,
    },
  ];

  return (
    <BasePage>
      <SplitCard>
        <DeptTree onSelect={setSelectDeptId} />
        <TableList<API.User>
          title="用户管理"
          ref={ref}
          params={{ deptId: selectDeptId }}
          resource={ApiConfig.user}
          rowKey="id"
          columns={BizSchema.sysUser.columns}
          editForm={EditForm}
          lineActionList={lineActionList}
        />
      </SplitCard>
    </BasePage>
  );
};
