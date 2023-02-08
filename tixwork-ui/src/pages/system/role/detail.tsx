import CommonColumn from '@/components/value-type/common-column';
import DetailRoleDataScope from '@/pages/system/role/components/detail-role-data-scope';
import DetailRoleMenu from '@/pages/system/role/components/detail-role-menu';
import DetailRoleUse from '@/pages/system/role/components/detail-role-use';
import { isEmpty } from '@/utils/object-utils';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { Result, Tabs } from 'antd';
import styles from './components/styles.less';

type RoleDetailType = {
  item: API.Role;
};

const columns: any[] = [
  {
    title: 'ID',
    dataIndex: 'roleId',
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
  if (item?.admin) {
    return (
      <ProCard title={title} className={styles.detail} ghost>
        <Result
          status="success"
          title={item.roleName}
          subTitle="拥有超级管理员权限。无需任何设置，拥有系统所有权限。"
        />
      </ProCard>
    );
  }
  const disabled = isEmpty(item);
  return (
    <ProCard title={title} className={styles.detail}>
      <ProDescriptions title="基本信息" dataSource={item} column={3} columns={columns} />
      <Tabs defaultActiveKey="menu-privilege">
        <Tabs.TabPane tab="菜单权限" key="menu-privilege" disabled={disabled}>
          <DetailRoleMenu role={item} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="自定义权限" key="data-privilege" disabled={disabled}>
          <DetailRoleDataScope role={item} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="关联用户" key="users" disabled={disabled}>
          <DetailRoleUse role={item} />
        </Tabs.TabPane>
      </Tabs>
    </ProCard>
  );
}
