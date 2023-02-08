import useProfile from '@/services/use-profile';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Avatar, Dropdown, Spin } from 'antd';
import type { ItemType } from 'antd/es/menu/hooks/useItems';
import { useCallback } from 'react';
import logo from '../../../assets/logo.svg';
import styles from './index.less';

export default function AvatarDropdown() {
  const { profile, logout } = useProfile();

  const onMenuClick = useCallback((event: any) => {
    const { key } = event;
    if (key === 'logout') {
      logout().then();
      return;
    }
    history.push(`/account/${key}`);
  }, []);

  const { nickName, avatar } = profile?.user || {};
  if (!nickName) {
    return (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
      </span>
    );
  }
  const menuItems: ItemType[] = [
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '个人设置',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <Dropdown menu={{ items: menuItems, onClick: onMenuClick }}>
      <span className={`account-bar ${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={avatar || logo} alt="avatar" />
        <span className={`${styles.name} anticon`}>{nickName}</span>
      </span>
    </Dropdown>
  );
}
