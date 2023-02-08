import _ from 'lodash';
import { View } from '@tarojs/components';
import EleNumberInput, { EleNumberInputType } from './ele-number-input';
import './styles.less';

function EleMoney(props: EleNumberInputType) {
  const { value } = props;
  const theValue: any = _.isString(value) ? _.toNumber(value) : value;
  return (
    <View className='ele-money'>
      <View className='ele-money-icon'>￥</View>
      <EleNumberInput {...props} value={theValue} />
    </View>
  );
}

export default EleMoney;
