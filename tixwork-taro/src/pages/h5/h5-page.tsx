import { useVisible } from '@/service/use-service';
import { View, WebView } from '@tarojs/components';

import Spin from '@/components/spin';
import Taro from '@tarojs/taro';

export type H5PageProps = {
  uri: string;
};

export default function H5Page() {
  const { visible, close } = useVisible(true);
  const { uri = '' } = Taro.useRouter().params;
  const src = decodeURIComponent(uri);
  console.log('action path in H5', src);
  return (
    <View>
      <Spin size='large' spinning={visible} />
      <WebView src={src} onLoad={close} />
    </View>
  );
}
