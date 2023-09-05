import TableList from '@/components/table-list';
import ApiConfig from '@/http/api-config';
import type { API } from '@/http/api-types';
import ObjectUtils from '@/utils/object-utils';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { Empty } from 'antd';
import { columns, columnsForSub } from './columns';
import SubItemEditForm from './sub-item-edit-form';

export default (props: { row: API.Config }) => {
  const { row } = props;

  if (ObjectUtils.isEmpty(row)) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }
  const actionList = [
    {
      code: 'create',
      title: '增加字典值',
    },
  ];
  return (
    <ProCard>
      <ProDescriptions title={`基本信息：${row?.title}`} dataSource={row} column={4} columns={columns as any} />
      <TableList<API.Config>
        ghost
        resource={ApiConfig.config}
        title="配置项"
        dataSource={row?.values}
        params={{
          parent: {
            id: row.id,
          },
          type: 'VALUE',
        }}
        actionList={actionList}
        search={false}
        columns={columnsForSub}
        editForm={(plist) => <SubItemEditForm {...plist} parent={row} />}
      />
    </ProCard>
  );
};
