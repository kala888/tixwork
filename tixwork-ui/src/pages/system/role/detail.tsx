import CommonColumn from '@/components/value-type/common-column';
import type { API } from '@/http/api-types';
import DetailRoleDataScope from '@/pages/system/role/components/detail-role-data-scope';
import DetailRoleMenu from '@/pages/system/role/components/detail-role-menu';
import DetailRoleUse from '@/pages/system/role/components/detail-role-use';
import ObjectUtils from '@/utils/object-utils';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { Result, Tabs } from 'antd';

type RoleDetailType = {
  item: API.Role;
};

const columns: any[] = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '角色名',
    dataIndex: 'roleName',
    valueType: 'NickName',
  },
  {
    title: '权限标识',
    valueType: 'text',
    dataIndex: 'roleKey',
  },
  CommonColumn.status,
  {
    title: '排序',
    dataIndex: 'roleSort',
    valueType: 'digit',
  },
  CommonColumn.createTime,
];

const title = '角色详情与权限';

export default function Detail(props: RoleDetailType) {
  const { item = {} as any } = props;
  if (item?.superAdmin) {
    return (
      <ProCard title={title} ghost>
        <Result
          status="success"
          title={item.roleName}
          subTitle="拥有超级管理员权限。无需任何设置，拥有系统所有权限。"
        />
      </ProCard>
    );
  }
  const disabled = ObjectUtils.isEmpty(item);
  const items = [
    {
      label: `菜单权限`,
      key: 'menu-privilege',
      disabled,
      children: <DetailRoleMenu role={item} />,
    },
    {
      label: `自定义权限`,
      key: 'data-privilege',
      disabled,
      children: <DetailRoleDataScope role={item} />,
    },
    {
      label: `关联用户`,
      key: 'users',
      disabled,
      children: <DetailRoleUse role={item} />,
    },
  ];
  return (
    <ProCard title={title}>
      <ProDescriptions title="基本信息" dataSource={item} column={3} columns={columns} />
      <Tabs defaultActiveKey="menu-privilege" items={items} />
    </ProCard>
  );
}
