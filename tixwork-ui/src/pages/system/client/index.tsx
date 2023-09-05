import BasePage from '@/components/layout/base-page';
import TableList from '@/components/table-list';
import ApiConfig from '@/http/api-config';
import { columns } from './columns';
import EditForm from './edit-form';

export default () => {
  const lineActionList = [{ code: 'edit' }];
  return (
    <BasePage>
      <TableList
        title="客户端管理"
        resource={ApiConfig.client}
        rowKey="id"
        editForm={EditForm}
        columns={columns}
        lineActionList={lineActionList}
      />
    </BasePage>
  );
};
