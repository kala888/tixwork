import EleTableList from '@/components/ele-table-list/ele-table-list';
import CommonColumn from '@/components/value-type/common-column';
import ApiConfig from '@/http/api-config';
import Q from '@/http/http-request/q';
import { ProCard } from '@ant-design/pro-components';
import EditForm from '../edit-form';

export default function DetailRoleUse(props) {
  const { role } = props;

  const request = async (params) => {
    if (params.roleId) {
      const resp = await Q.get<API.TableDataInfo<API.User>>(ApiConfig.getRoleUserList, {
        roleId: params.roleId,
      });
      console.log('the....resp', resp);
      return {
        data: resp.data?.rows,
        success: true,
        total: resp.data?.total,
        current: params?.current,
        pageSize: params?.pageSize,
      };
    }
    return {};
  };

  const columns: any[] = [
    {
      title: 'ID',
      dataIndex: 'userId',
      width: 50,
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      valueType: 'NickName',
      width: 200,
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      valueType: 'NickName',
      width: 200,
    },
    CommonColumn.status,
  ];

  return (
    <ProCard title="角色-关联用户" ghost>
      <EleTableList<API.User>
        title="用户列表"
        params={role}
        request={request}
        resource={ApiConfig.user}
        rowKey="userId"
        columns={columns}
        editForm={EditForm}
        search={false}
      />
    </ProCard>
  );
}
