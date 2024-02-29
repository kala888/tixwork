import { View } from '@tarojs/components';
import './styles.less';
import ObjectUtils from '@/utils/object-utils';

type DividerType = {
  title?: string;
  fontColor?: string;
  lineColor?: string;
};

export default function Divider(props: DividerType) {
  const { title, fontColor = '#ddd', lineColor = '#ccc' } = props;

  if (ObjectUtils.isEmpty(title)) {
    return (
      <View className='divider'>
        <View className='divider--line' style={{ backgroundColor: lineColor }} />
      </View>
    );
  }

  return (
    <View className='divider'>
      <View className='divider--line' style={{ backgroundColor: lineColor }} />
      <View className='divider--text' style={{ color: fontColor }}>
        {title}
      </View>
      <View className='divider--line' style={{ backgroundColor: lineColor }} />
    </View>
  );
}
