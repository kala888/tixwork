import { View } from '@tarojs/components';
import Spin from '@/components/spin';

function Loading(props: { title?: string }) {
  const { title = '加载中' } = props;
  return (
    <Spin spinning={false}>
      <View
        style={{
          height: '10vh',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}
      >
        <View style={{ color: ' #999', fontSize: 20 }}>{title}</View>
      </View>
    </Spin>
  );
}

export default Loading;
