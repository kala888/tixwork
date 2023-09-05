import BasePage from '@/components/layout/base-page';
import TableList from '@/components/table-list';
import TreeExpandIcon from '@/components/tree/tree-expand-icon';
import type { EleValueType } from '@/components/value-type';
import CommonColumn from '@/components/value-type/common-column';
import ApiConfig from '@/http/api-config';
import type { API } from '@/http/api-types';
import type { ProColumnType } from '@ant-design/pro-components';
import EditForm from './edit-form';

const columns: ProColumnType<API.Dept, EleValueType>[] = [
  {
    title: '部门名称',
    dataIndex: 'deptName',
    valueType: 'IconText',
  },
  {
    title: '部门编码',
    dataIndex: 'id',
    align: 'center',
    hideInForm: true,
  },
  {
    title: '负责人',
    dataIndex: 'leader',
    hideInSearch: true,
    align: 'center',
  },
  {
    title: '联系电话',
    dataIndex: 'mobile',
    hideInSearch: true,
    align: 'center',
  },
  // {
  //   title: '邮箱',
  //   dataIndex: 'email',
  //   hideInSearch: true,
  //   align: 'center',
  // },
  {
    title: '排序',
    dataIndex: 'sortOrder',
    valueType: 'digit',
    hideInSearch: true,
    align: 'center',
  },
  CommonColumn.status,
  CommonColumn.createTime,
];

export default () => {
  return (
    <BasePage>
      <TableList<API.Dept>
        title="部门管理"
        resource={ApiConfig.dept}
        rowKey="id"
        columns={columns}
        editForm={EditForm}
        search={false}
        pagination={false}
        expandable={{
          rootPath: '[0].children',
          defaultExpandAllRows: true,
          expandIcon: (plist) => <TreeExpandIcon {...plist} />,
        }}
      />
    </BasePage>
  );
};
