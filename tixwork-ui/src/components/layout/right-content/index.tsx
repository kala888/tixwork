import { useModel } from '@umijs/max';
import { Alert, Space } from 'antd';
import NoticeIconView from '../notice-icon';
import AvatarDropdown from './avatar-dropdown';
import styles from './index.less';
import Marquee from 'react-fast-marquee';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Q from '@/http/http-request/q';
import useVersionCheck from '@/services/use-version-check';

const GlobalHeaderRight = () => {
  const { initialState } = useModel('@@initialState');
  const [expireDate, setExpireDate] = useState<string>();
  useVersionCheck();

  useEffect(() => {
    Q.get('/api/system/dict/key/app.expire.date').then((resp) => setExpireDate(resp.data));
  }, []);

  if (!initialState?.settings) {
    return null;
  }

  const { layout } = initialState.settings;
  let className = styles.right;

  if (layout === 'top' || layout === 'mix') {
    className = `${styles.right} ${styles.dark}`;
  }
  const showTips = expireDate && moment(expireDate).diff(moment(), 'days') < 30;
  return (
    <div style={{ width: '100%' }}>
      {showTips && (
        <Alert
          banner
          style={{ backgroundColor: 'black', paddingRight: 0, paddingLeft: 4 }}
          message={
            <Marquee pauseOnHover gradient={false} style={{ color: 'white' }}>
              服务即将到期，为了避免停机以及不必要的损失，请尽快联系供应商，进行参数调整。
            </Marquee>
          }
        />
      )}
      <Space className={className}>
        <NoticeIconView />
        <AvatarDropdown />
      </Space>
    </div>
  );
};

export default GlobalHeaderRight;
