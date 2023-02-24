import EleTableList from '@/components/ele-table-list/ele-table-list';
import BasePage from '@/components/layout/base-page';
import type { EleValueType } from '@/components/value-type';
import ApiConfig from '@/http/api-config';
import type { ProColumnType } from '@ant-design/pro-components';

const columns: ProColumnType<any, EleValueType>[] = [
  {
    title: '用户名',
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
      '1': {
        text: '停用',
        status: 'Error',
      },
      '0': {
        text: '正常',
        status: 'Processing',
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
  return (
    <BasePage title="登录记录">
      <EleTableList
        resource={ApiConfig.loginRecord}
        columns={columns}
        formProps={{ columns }}
        options={false}
        toolBarRender={false}
        lineActionList={false}
      />
    </BasePage>
  );
};
