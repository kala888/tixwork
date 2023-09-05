import { GridContent } from '@ant-design/pro-components';
import { Menu } from 'antd';
import React, { useLayoutEffect, useRef, useState } from 'react';
import NotificationSetting from './notification-setting';
import ProfileSetting from './profile-setting';
import SecuritySetting from './security-setting';
import styles from './styles.less';

type SettingsStateKeys = 'base' | 'security' | 'binding' | 'notification';
type SettingsState = {
  mode: 'inline' | 'horizontal';
  selectKey: SettingsStateKeys;
};

const menuMap: Record<string, React.ReactNode> = {
  base: '',
  security: '',
  binding: '',
  notification: '',
};

const Settings = () => {
  const ref = useRef<any>();
  const [initConfig, setInitConfig] = useState<SettingsState>({
    mode: 'inline',
    selectKey: 'base',
  });

  const resize = () => {
    requestAnimationFrame(() => {
      if (!ref.current) {
        return;
      }
      let mode: 'inline' | 'horizontal' = 'inline';
      const { offsetWidth } = ref.current;
      if (ref.current.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      setInitConfig({ ...initConfig, mode: mode as SettingsState['mode'] });
    });
  };

  useLayoutEffect(() => {
    if (ref.current) {
      window.addEventListener('resize', resize);
      resize();
    }
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [ref.current]);

  const handleMenuClick = ({ key }) => {
    setInitConfig({
      ...initConfig,
      selectKey: key as SettingsStateKeys,
    });
  };

  const { selectKey } = initConfig;

  return (
    <GridContent>
      <div className={styles.account} ref={ref}>
        <div className={styles.accountLeft}>
          <Menu mode={initConfig.mode} selectedKeys={[initConfig.selectKey]} onClick={handleMenuClick}>
            <Menu.Item key={'base'}>基本设置</Menu.Item>
            <Menu.Item key={'security'}>安全设置</Menu.Item>
            <Menu.Item key={'notification'}>通知设置</Menu.Item>
          </Menu>
        </div>
        <div className={styles.accountRight}>
          <div className={styles.title}>{menuMap[initConfig.selectKey]}</div>
          {selectKey === 'base' && <ProfileSetting />}
          {selectKey === 'security' && <SecuritySetting />}
          {selectKey === 'notification' && <NotificationSetting />}
        </div>
      </div>
    </GridContent>
  );
};
export default Settings;
