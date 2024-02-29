import { Text, View } from '@tarojs/components';
import './account-info.less';
import ActionIcon from '@/components/action-icon/action-icon';

export default function AccountInfo() {
  return (
    <View className={'account-info'}>
      <View className={'account-info-header'}>
        <View className={'account-info-title'}>
          <ActionIcon icon={'app'} />
          <Text className={'account-info-title-txt'}>我的账号</Text>
        </View>
        <ActionIcon icon={'arrow-right'} />
      </View>
      <View className={'account-info-body'}></View>
    </View>
  );
}
