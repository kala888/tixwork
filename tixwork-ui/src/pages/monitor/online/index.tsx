import EleTableList from '@/components/ele-table-list/ele-table-list';
import BasePage from '@/components/layout/base-page';
import type { EleValueType } from '@/components/value-type';
import ApiConfig from '@/http/api-config';
import type { ActionList } from '@/utils/nice-router-types';
import type { ProColumnType } from '@ant-design/pro-components';

const columns: ProColumnType<any, EleValueType>[] = [
  {
    title: '会话编号',
    dataIndex: 'tokenId',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '登录名称',
    dataIndex: 'userName',
    align: 'center',
  },
  {
    title: '部门名称',
    dataIndex: 'deptName',
    align: 'center',
  },
  {
    title: '登录地址',
    dataIndex: 'ipaddr',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '登录地点',
    dataIndex: 'loginLocation',
    align: 'center',
  },
  {
    title: '浏览器',
    dataIndex: 'browser',
    align: 'center',
  },
  {
    title: '操作系统',
    dataIndex: 'os',
    align: 'center',
  },
  {
    title: '登录时间',
    dataIndex: 'loginTime',
    width: 180,
    align: 'center',
    valueType: 'dateTime',
  },
];

export default () => {
  const lineActions: ActionList = [{ code: 'remove', title: '强制下线' }];
  return (
    <BasePage>
      <EleTableList
        lineActionList={lineActions}
        rowKey="tokenId"
        resource={{
          linkToUrl: ApiConfig.online,
          method: 'GET',
        }}
        title="在线用户"
        columns={columns}
        options={false}
        toolBarRender={false}
        scroll={{ x: 1300 }}
      />
    </BasePage>
  );
};
