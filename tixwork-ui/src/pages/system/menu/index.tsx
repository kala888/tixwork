import BasePage from '@/components/layout/base-page';
import TableList from '@/components/table-list';
import TreeExpandIcon from '@/components/tree/tree-expand-icon';
import type { EleValueType } from '@/components/value-type';
import CommonColumn from '@/components/value-type/common-column';
import ApiConfig from '@/http/api-config';
import type { API } from '@/http/api-types';
import type { ProColumnType } from '@ant-design/pro-components';
import EditForm from './edit-form';

const columns: ProColumnType<API.Menu, EleValueType>[] = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    valueType: 'IconText',
  },

  {
    title: '权限标识',
    dataIndex: 'perms',
  },
  {
    title: '路径',
    dataIndex: 'path',
  },
  {
    title: '组件',
    dataIndex: 'component',
  },
  {
    title: '跳转路径',
    dataIndex: 'redirect',
  },
  {
    title: '排序',
    dataIndex: 'sortOrder',
    align: 'center',
    valueType: 'digit',
  },
  {
    title: '菜单类型',
    dataIndex: 'menuType',
    valueType: 'Tag',
    align: 'center',
    valueEnum: {
      FOLDER: '目录',
      MENU: '菜单',
      FUNC: '按钮',
    },
  },
  CommonColumn.status,
];

export default () => {
  return (
    <BasePage>
      <TableList<API.Menu>
        title="菜单管理"
        resource={ApiConfig.menu}
        rowKey="id"
        columns={columns as any}
        editForm={EditForm}
        search={false}
        pagination={false}
        expandable={{
          defaultExpandAllRows: true,
          expandIcon: (plist) => <TreeExpandIcon {...plist} />,
        }}
      />
    </BasePage>
  );
};
