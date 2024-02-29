import React from 'react';
import { View } from '@tarojs/components';
import classNames from 'classnames';
import './ele-badge.less';
import _ from 'lodash';

type EleBadgeProps = {
  dot?: boolean;
  value?: number;
  maxValue?: number;
  className?: string;
  children?: React.ReactNode;
};

export default function EleBadge(props: EleBadgeProps) {
  const { dot, value, maxValue = 99, className } = props;
  // @ts-ignore
  const theValue = value > maxValue ? `${maxValue}+` : `${value}`;
  return (
    <View className={classNames('ele-badge', className)}>
      {props.children}
      {dot && <View className='ele-badge-dot' />}
      {!_.isNil(value) && <View className='ele-badge-num'>{theValue}</View>}
    </View>
  );
}
