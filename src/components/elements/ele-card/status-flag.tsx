import React from 'react';
import { Text, View } from '@tarojs/components';
import { codeLength, getExtMode, isEmpty } from '@/nice-router/nice-router-util';
import './status-flag.scss';

interface StatusFlagProps {
  title?: string;
  size?: 'normal' | 'small';
}

const StatusFlag: React.FC<StatusFlagProps> = (props) => {
  const { title = '', size = 'normal' } = props;
  if (isEmpty(title)) {
    return null;
  }
  const length = codeLength(title);
  const txtClass = getExtMode({
    txt_large: length <= 4,
    txt_normal: length > 4 && length <= 6,
    txt_small: length > 6 && length <= 8,
    txt_tiny: length >= 10,
  }).classNames('status-flag-txt');

  const rootClass = getExtMode({ [size]: size }).classNames('status-flag');

  return (
    <View className={rootClass}>
      <View className='status-flag-bg' />
      <Text className={txtClass}>{title}</Text>
    </View>
  );
};

export default StatusFlag;
