import { usePageTitle, usePullDown } from '@/service/use-service';
import { View } from '@tarojs/components';
import Spin from '@/components/spin';
import './styles.less';
import classNames from 'classnames';

type BasePageProps = {
  children: any;
  title?: string;
  onRefresh?: () => Promise<void>;
  className?: any;
  loading?: boolean;
};

export default function BasePage(props: BasePageProps) {
  const { loading, className, children, title, onRefresh } = props;
  usePageTitle(title);
  usePullDown(onRefresh);

  const rooCls = classNames('base-page', className);

  return (
    <View className={rooCls}>
      <Spin spinning={loading}>{children}</Spin>
    </View>
  );
}
