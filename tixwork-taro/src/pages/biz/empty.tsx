import { Image, View } from '@tarojs/components';
import emptyImage from '@/assets/images/empty.png';

function Empty(props: { title?: string }) {
  const { title = '暂无数据' } = props;
  return (
    <View style={{ textAlign: 'center', marginTop: '30vh' }}>
      <Image src={emptyImage} mode='aspectFit' style={{ width: '50vw' }} />
      <View style={{ color: ' #999', fontSize: 22 }}>{title}</View>
    </View>
  );
}

export default Empty;
