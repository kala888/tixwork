import CommonColumn from '@/components/value-type/common-column';
import ApiConfig from '@/http/api-config';
import type { API } from '@/http/api-types';
import Q from '@/http/http-request/q';
import type { ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Popconfirm, Typography } from 'antd';
import { useRef } from 'react';

export default function DetailRoleUse(props) {
  const { role } = props;
  const actionRef = useRef<ActionType>();

  const request = async (params) => {
    if (params.id) {
      const resp = await Q.post<API.TableDataInfo<API.User>>(
        ApiConfig.listUsersByRole,
        {
          roleId: params.id,
        },
        {
          params: {
            pageNum: params?.current,
            pageSize: params?.pageSize,
          },
        },
      );
      console.log('the....resp', resp);
      return {
        ...resp,
        success: true,
        current: params?.current,
        pageSize: params?.pageSize,
      };
    }
    return {};
  };

  const unAuth = async (record) => {
    await Q.put(ApiConfig.unauthorized, {
      userId: record.id,
      roleId: role.id,
    });
    actionRef.current?.reload();
  };

  const columns: any[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 50,
    },
    {
      title: '账号',
      dataIndex: 'userName',
      valueType: 'userName',
      width: 200,
    },
    {
      title: '名称',
      dataIndex: 'nickName',
      valueType: 'NickName',
      width: 200,
    },
    CommonColumn.status,
    {
      title: '操作',
      key: 'option',
      render: (text, record) => (
        <Popconfirm title="确定要解除吗？" onConfirm={() => unAuth(record)}>
          <Typography.Link type={'danger'}>解除</Typography.Link>
        </Popconfirm>
      ),
      align: 'center',
    },
  ];

  return (
    <ProTable<API.User>
      actionRef={actionRef}
      headerTitle={'角色-关联用户'}
      search={false}
      toolBarRender={false}
      params={role}
      request={request}
      rowKey="id"
      columns={columns}
      pagination={{
        pageSize: 10,
      }}
    />
  );
}
