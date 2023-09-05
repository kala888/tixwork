import BizSchema from '@/biz-models/biz-schema';
import BasePage from '@/components/layout/base-page';
import TableList from '@/components/table-list';
import ApiConfig from '@/http/api-config';
import type { API } from '@/http/api-types';
import Q from '@/http/http-request/q';
import { SyncOutlined } from '@ant-design/icons';
import { App, Popover } from 'antd';
import EditForm from './edit-form';

export default () => {
  const { message, modal } = App.useApp();
  const schema = BizSchema.sysTenant;

  const lineActionList = [
    { code: 'edit' },
    {
      id: 'sync',
      title: (
        <Popover content="同步套餐">
          <SyncOutlined />
        </Popover>
      ),
      onClick: (record: API.Tenant) => {
        modal.confirm({
          title: `确认同步套餐内容到${record.companyName}`,
          onOk: () => {
            Q.get(ApiConfig.syncTenantPackage, { tenantId: record.tenantId }).then(() => {
              message.success('同步成功');
            });
          },
        });
      },
    },
  ];
  return (
    <BasePage>
      <TableList<API.Tenant>
        title="租户管理"
        resource={schema.linkToUrl}
        columns={schema.columns}
        editForm={EditForm}
        lineActionList={lineActionList}
        search={false}
      />
    </BasePage>
  );
};
