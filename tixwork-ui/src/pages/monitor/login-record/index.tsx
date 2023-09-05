import BasePage from '@/components/layout/base-page';
import TableList from '@/components/table-list';
import type { EleValueType } from '@/components/value-type';
import ApiConfig from '@/http/api-config';
import Q from '@/http/http-request/q';
import type { ProColumnType } from '@ant-design/pro-components';
import { App } from 'antd';
import { useRef } from 'react';

const columns: ProColumnType<any, EleValueType>[] = [
  {
    title: '账号',
    dataIndex: 'userName',
  },
  {
    title: 'IP',
    dataIndex: 'ipaddr',
  },
  {
    title: '登录地点',
    dataIndex: 'loginLocation',
    hideInSearch: true,
  },
  {
    title: '浏览器',
    dataIndex: 'browser',
    hideInSearch: true,
  },
  {
    title: '操作系统',
    dataIndex: 'os',
    hideInSearch: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    valueEnum: {
      '0': {
        text: '成功',
        status: 'Processing',
      },
      '1': {
        text: '失败',
        status: 'Error',
      },
    },
    hideInSearch: true,
  },
  {
    title: '系统信息',
    dataIndex: 'msg',
    hideInSearch: true,
  },
  {
    title: '登录时间',
    dataIndex: 'loginTime',
    hideInSearch: true,
  },
];

export default () => {
  const { modal, message } = App.useApp();
  const ref = useRef<any>();

  const actionList: any[] = [
    {
      code: 'clean',
      title: '清理全部',
      level: 'danger',
      onClick: () => {
        modal.confirm({
          title: '确定清理全部登录日志吗？',
          onOk: async () => {
            await Q.remove(ApiConfig.loginRecord + '/clean');
            ref.current?.refresh();
            await message.success('清空成功');
          },
        });
      },
    },
  ];
  return (
    <BasePage>
      <TableList
        title="登录记录"
        resource={ApiConfig.loginRecord}
        columns={columns}
        formProps={{ columns }}
        actionList={actionList}
        lineActionList={false}
      />
    </BasePage>
  );
};
