import { View } from '@tarojs/components';
import './about-us.less';
import EleRichText from '@/components/elements/ele-rich-text';
import { useGet } from '@/http/use-http';
import ApiConfig from '@/utils/api-config';

export default function AboutUs() {
  const { data } = useGet<any>(ApiConfig.AboutUs);
  const { aboutUs = '欢迎使用本小程序' } = data || {};
  return (
    <View className='about-us'>
      <View className='about-us-body'>
        <EleRichText content={aboutUs} />
      </View>
      <View className='about-us-footer'>本小程序由钛安科技技术支持</View>
    </View>
  );
}
