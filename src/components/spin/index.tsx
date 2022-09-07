import { View } from '@tarojs/components';
import classNames from 'classnames';
import './styles.less';

type SpinType = {
  type?: 'ring' | 'voice' | 'point-line' | 'ripple';
  children?: any;
  size?: 'default' | 'small' | 'large';
  spinning?: boolean;
};

export default function Spin(props: SpinType) {
  const { type = 'ring', size = 'small', spinning = false } = props;

  if (!spinning) {
    return props.children;
  }

  const spinTypeCls = classNames(`spin--${size}`, {
    'spin--ring': type === 'ring',
    'spin--voice': type === 'voice',
    'spin--point-line': type === 'point-line',
    'spin--ripple': type === 'ripple',
  });

  return (
    <View className='spin'>
      <View className='spin__mark' />
      {props.children}
      <View className='spin__content'>
        <View className={spinTypeCls}>
          <View />
          <View />
          <View />
          <View />
          <View />
        </View>
      </View>
    </View>
  );
}
