import ProEditForm from '@/components/form/pro-edit-form';
import TableList from '@/components/table-list';
import ApiConfig from '@/http/api-config';
import type { API } from '@/http/api-types';
import type { ActionList } from '@/utils/nice-router-types';
import { ProDescriptions } from '@ant-design/pro-components';
import { App } from 'antd';

import { RefreshCacheButton } from '@/pages/system/setting/utils';
import { columns } from './columns';

const EditForm = (props) => {
  const convertValues = (values) => ({
    ...values,
    type: 'CONFIG',
  });
  return <ProEditForm {...props} convertValues={convertValues} />;
};

/**
 * 在REDIS中设置参数
 */
export default (props) => {
  const { modal } = App.useApp();

  const actionList = [{ code: 'create' }, <RefreshCacheButton key="refresh-cache" />];

  const handleViewDetail = (record) => {
    modal.success({
      width: '60%',
      title: '配置详情',
      content: (
        <ProDescriptions
          title={`基本信息：${record.displayName}`}
          dataSource={record}
          column={3}
          columns={columns as any}
        />
      ),
    });
  };

  const lineActions: ActionList = [
    {
      code: 'edit',
    },
    {
      code: 'detail',
      title: '查看详情',
      onClick: handleViewDetail,
    },
  ];

  return (
    <TableList<API.Config>
      title={'系统配置'}
      search={false}
      resource={ApiConfig.config}
      rowKey="id"
      params={{ type: 'CONFIG' }}
      columns={columns}
      pagination={false}
      actionList={actionList}
      formProps={{ columns }}
      lineActionList={lineActions}
      editForm={EditForm}
    />
  );
};
