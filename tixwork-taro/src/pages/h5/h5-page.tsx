import { useVisible } from '@/service/use-service';
import { View, WebView } from '@tarojs/components';

import { Current } from '@tarojs/taro';
import Spin from '@/components/spin';

export type H5PageProps = {
  uri: string;
};

export default function H5Page() {
  const { visible, close } = useVisible(true);
  const { uri = '' } = (Current.router?.params || {}) as H5PageProps;
  const src = decodeURIComponent(uri);
  console.log('action path in H5', src);
  return (
    <View>
      <Spin size='large' spinning={visible} />
      <WebView src={src} onLoad={close} />
    </View>
  );
}
