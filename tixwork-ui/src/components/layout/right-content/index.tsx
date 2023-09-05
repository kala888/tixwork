import TenantSwitch from '@/components/layout/right-content/tenant-switch';
import { useGet } from '@/http/use-http';
import useVersionCheck from '@/services/use-version-check';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useModel } from '@umijs/max';
import { Alert, Space } from 'antd';
import className from 'classnames';
import moment from 'moment';
import Marquee from 'react-fast-marquee';
import Bell from '../user-notice';
import AvatarDropdown from './avatar-dropdown';

export default () => {
  useVersionCheck();
  const { data: expireDate } = useGet('/api/system/config/key/app.expire.date');
  const { initialState } = useModel('@@initialState');
  const isTopMenu = initialState?.settings?.layout === 'top' || initialState?.settings?.layout === 'mix';

  const topMenuCss = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      '.remote-select': {
        minWidth: 160,
        marginLeft: 10,
      },
      '.ant-alert': {
        marginRight: isTopMenu ? 14 : 'auto',
        borderRadius: 2,
        backgroundColor: 'black',
        paddingRight: 0,
        paddingLeft: 4,
        height: 30,
        maxWidth: 300,
      },
      '.prefix-icon-wrapper': {
        color: token.colorTextPlaceholder,
      },
    };
  });

  const leftMenuCss = useEmotionCss(({ token }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '100%',
    '.remote-select': {
      width: '100%',
      paddingLeft: 20,
      '.ant-select-selector': {
        background: 'transparent',
      },
      '.ant-form-item-row': {
        width: '100%',
      },
    },
    '.ant-alert': {
      marginBottom: 4,
    },
  }));

  if (!initialState?.settings) {
    return null;
  }

  const showTips = expireDate && moment(expireDate).diff(moment(), 'days') < 30;

  const message = (
    <Marquee pauseOnHover gradient={false} style={{ color: 'white' }} speed={25}>
      软件维护服务即将到期，为了避免意外故障造成的不必要的损失，请尽快联系供应商，进行参数系统维护。
    </Marquee>
  );

  const isSuperAdmin = initialState?.profile?.superAdmin;

  const rootCls = className(topMenuCss, { [leftMenuCss]: !isTopMenu });

  return (
    // @ts-ignore
    <div className={rootCls} id="use-action">
      {showTips && <Alert banner message={message} />}
      {isSuperAdmin && <TenantSwitch />}
      <Space>
        <Bell />
        <AvatarDropdown />
      </Space>
    </div>
  );
};
