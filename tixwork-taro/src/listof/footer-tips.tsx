import { View } from '@tarojs/components';
import _ from 'lodash';
import { getExtMode } from '@/nice-router/nice-router-utils';
import Spin from '@/components/spin';
import './footer-tips.less';

type FooterTipsProps = {
  hasNextPage?: boolean;
  loading?: boolean;
  onLoadMore?: Function;
};

function FooterTips(props: FooterTipsProps) {
  const { hasNextPage = false, loading, onLoadMore } = props;

  let tips = loading ? '正在加载中...' : '我们是有底线的';

  if (!loading && hasNextPage) {
    tips = '加载更多';
  }

  const handleLoadMore = () => {
    if (!loading && hasNextPage && _.isFunction(onLoadMore)) {
      onLoadMore();
    }
  };

  const rootClass = getExtMode({ loading }).classNames('listof-footer-tips');
  console.log('sleep 1s', loading);
  return (
    <View className={rootClass} onClick={handleLoadMore}>
      <View className='listof-footer-tips-line' />
      <View className='listof-footer-tips-loading'>
        <Spin size='small' />
      </View>
      <View className='listof-footer-tips-txt'>{tips}</View>
      <View className='listof-footer-tips-line' />
    </View>
  );
}

export default FooterTips;
