import useProfile from '@/services/use-profile';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history } from '@umijs/max';
import { Avatar, Dropdown, Spin } from 'antd';
import type { ItemType } from 'antd/es/menu/hooks/useItems';
import { useCallback } from 'react';
import logo from '../../../assets/logo.svg';

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

  const rootCss = useEmotionCss(({ token }) => ({
    display: 'flex',
    alignItems: 'center',
    height: 48,
    padding: ' 0 12px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontWeight: 500,
    color: token.colorTextHeading,

    '.ant-avatar': {
      marginRight: 8,
      color: token.colorPrimary,
      verticalAlign: 'top',
      background: ' rgba(255, 255, 255, 0.85)',
    },
  }));

  const { nickName, avatar } = profile?.user || {};
  if (!nickName) {
    return (
      <span className={rootCss}>
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
      <span className={rootCss}>
        <Avatar src={avatar || logo} alt="avatar" />
        <span>{nickName}</span>
      </span>
    </Dropdown>
  );
}
