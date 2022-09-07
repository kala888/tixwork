import { View } from '@tarojs/components';

export default function PolicySection(props) {
  const { title, content } = props;
  return (
    <View className='policy-section'>
      <View className='policy-section-title'>
        <View className={'policy-section-title-text'}>{title}</View>
        <View className={'policy-section-title-triangle'} />
      </View>

      <View className={'policy-section-content'}>{content || props.children}</View>
    </View>
  );
}
