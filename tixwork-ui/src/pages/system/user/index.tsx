import React, { useRef, useState } from 'react';
import EleTableList from '@/components/ele-table-list/ele-table-list';
import BasePage from '@/components/layout/base-page';
import SplitPanel from '@/components/split-panel/split-panel';
import DeptTree from '@/components/tree/dept-tree';
import type { EleValueType } from '@/components/value-type';
import CommonColumn from '@/components/value-type/common-column';
import ApiConfig from '@/http/api-config';
import type { ProColumnType } from '@ant-design/pro-components';
import type { EleTableListRef } from '@/components/ele-table-list/ele-table-list-types';
import EditForm from './edit-form';
import { OptionAction } from '@/components/value-type/action-list/more-option-action';
import { Modal, Space, Typography } from 'antd';
import Q from '@/http/http-request/q';

const columns: ProColumnType<API.User, EleValueType>[] = [
  {
    title: 'ID',
    dataIndex: 'userId',
    width: 50,
    hideInForm: true,
  },
  {
    title: '昵称',
    dataIndex: 'nickName',
    valueType: 'NickName',
    width: 200,
  },
  {
    title: '账号',
    dataIndex: 'userName',
    align: 'center',
  },
  {
    title: '部门',
    hideInSearch: true,
    dataIndex: ['dept', 'displayName'],
    align: 'center',
    search: false,
  },
  CommonColumn.status,
  CommonColumn.createTime,
];

export default () => {
  const [selectDeptId, setSelectDeptId] = useState<React.Key>();
  const renderLeft = () => <DeptTree onSelect={setSelectDeptId} />;
  const ref = useRef<EleTableListRef<any>>();

  const handleChangePassword = async (record) => {
    const resp = await Q.get(ApiConfig.resetUserPassword, { userId: record.userId });
    Modal.success({
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

  const lineActionList = [
    {
      code: 'change',
      render: (record) => (
        <OptionAction
          title="编辑"
          onClick={() => ref.current?.onEdit(record)}
          disabled={record?.userId === 1}
        />
      ),
    },
    {
      code: 'changePassword',
      render: (record) => (
        <OptionAction
          level="danger"
          title="重置密码"
          onClick={() => handleChangePassword(record)}
          disabled={record?.userId === 1}
        />
      ),
    },
  ];

  return (
    <BasePage>
      <SplitPanel renderLeft={renderLeft}>
        <EleTableList<API.User>
          title="用户列表"
          ref={ref}
          params={{ deptId: selectDeptId }}
          resource={ApiConfig.user}
          rowKey="userId"
          columns={columns}
          editForm={EditForm}
          lineActionList={lineActionList}
        />
      </SplitPanel>
    </BasePage>
  );
};
