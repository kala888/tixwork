import { useInterval } from 'ahooks';
import { App, Button } from 'antd';
import _ from 'lodash';
import { useState } from 'react';

export default function useVersionCheck() {
  const { notification } = App.useApp();
  const [versionInfo, setVersionInfo] = useState<{ version?: string; message?: string }>({});
  console.info('start initial version check');

  const checkVersion = async () => {
    if (process.env.NODE_ENV === 'development') {
      return;
    }
    const versionInfoUrl = '/version.json?' + Date.now().valueOf();
    const resp = await fetch(versionInfoUrl);
    const data = await resp.json();
    if (_.isNil(versionInfo?.version) || _.isNil(data?.version)) {
      setVersionInfo(data);
      return;
    }
    // 如果内存中的version落后于服务器，提示更新。
    if (data?.version > versionInfo?.version) {
      const message = data.message || '请更新当前应用';

      const key = `update-${Date.now()}`;
      const handleReload = () => {
        notification.destroy(key);
        location.reload();
      };
      const btn = (
        <Button type="primary" size="small" onClick={handleReload}>
          立即更新
        </Button>
      );
      notification.warning({
        message: '发现新功能',
        description: message,
        duration: 30,
        btn,
        key,
      });
    }
  };
  useInterval(checkVersion, 60 * 30 * 1000);
}
