import { formatMoney } from '@/utils';
import { View } from '@tarojs/components';
import './styles.less';

export default function JustALineTemplate(props) {
  const { item = {} } = props;
  const { title, amount = 0 } = item;
  return (
    <View className='just-a-line'>
      <View>{title}</View>
      <View>{formatMoney(amount)}</View>
    </View>
  );
}
