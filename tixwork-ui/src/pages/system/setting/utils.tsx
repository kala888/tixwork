import ApiConfig from '@/http/api-config';
import Q from '@/http/http-request/q';
import { App, Button } from 'antd';

export const RefreshCacheButton = () => {
  const { message } = App.useApp();
  const handleRefresh = async () => {
    const resp = await Q.send(ApiConfig.refreshCache, { loading: true, method: 'DELETE' });
    if (resp.code === 200) {
      message.success('刷新成功');
    }
  };
  return (
    <Button type={'primary'} danger onClick={handleRefresh}>
      缓存刷新
    </Button>
  );
};
