import BasePage from '@/components/layout/base-page';
import { useTabsWithView } from '@/services/use-service';
import { ProCard } from '@ant-design/pro-components';
import ConfigPage from './config';
import DictConfigPage from './dict';
import OSSConfigPage from './oss-config';

/**
 * 在REDIS中设置参数
 */
export default () => {
  const tabItems = [
    {
      label: '系统配置',
      key: 'config',
      children: <ConfigPage />,
    },
    {
      label: '字典管理',
      key: 'dict',
      children: <DictConfigPage />,
    },
    {
      label: 'OSS设置',
      key: 'oss-config',
      children: <OSSConfigPage />,
    },
  ];
  const tabs = useTabsWithView(tabItems, 'config');

  return (
    <BasePage>
      <ProCard ghost tabs={tabs} />
    </BasePage>
  );
};
