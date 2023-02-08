import EleTableList from '@/components/ele-table-list/ele-table-list';
import BasePage from '@/components/layout/base-page';
import type { EleValueType } from '@/components/value-type';
import CommonColumn from '@/components/value-type/common-column';
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
  },
  {
    title: '浏览器',
    dataIndex: 'browser',
  },
  {
    title: '操作系统',
    dataIndex: 'os',
  },
  CommonColumn.status,
  {
    title: '系统信息',
    dataIndex: 'msg',
  },
  {
    title: '登录时间',
    dataIndex: 'loginTime',
  },
];

export default () => {
  return (
    <BasePage>
      <EleTableList
        resource={ApiConfig.loginRecord}
        title="通知公告"
        columns={columns}
        formProps={{ columns }}
        options={false}
        toolBarRender={false}
        lineActionList={false}
      />
    </BasePage>
  );
};
