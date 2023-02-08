import { useInterval } from 'ahooks';
import { Button, notification } from 'antd';
import _ from 'lodash';
import { useState } from 'react';

const notify = (msg) => {
  const key = `update-${Date.now()}`;
  const handleReload = () => {
    notification.close(key);
    location.reload();
  };
  const btn = (
    <Button type="primary" size="small" onClick={handleReload}>
      立即更新
    </Button>
  );
  notification.warning({
    message: '发现新功能',
    description: msg,
    duration: 30,
    btn,
    key,
  });
};

export default function useVersionCheck() {
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
      notify(data.message || '请更新当前应用');
    }
  };
  useInterval(checkVersion, 60 * 30 * 1000);
}
