import { formatTime } from '@/utils';
import { View } from '@tarojs/components';

import './styles.less';

type InfoDatetimeProps = {
  value: any;
  format: string;
};

export default function InfoDatetime({ value, format }: InfoDatetimeProps) {
  const displayValue = formatTime(value, format);

  return <View className='info-datetime'>{displayValue}</View>;
}
