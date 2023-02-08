import React from 'react';
import { View } from '@tarojs/components';
import classNames from 'classnames';
import { isNotEmpty } from '@/utils/object-utils';
import Divider from '@/components/divider';

type EleBreakLineProps = {
  color?: string;
  height?: number;
  title?: string;
  fontColor?: string;
  customStyle?: React.CSSProperties;
  className?: string;
};

function EleBreakLine(props: EleBreakLineProps) {
  const { color, title, fontColor, customStyle, className } = props;

  const style = isNotEmpty(title)
    ? customStyle
    : {
        backgroundColor: color,
        margin: '10rpx 0',
        ...customStyle,
      };

  const rootClass = classNames('ele-break-line', className);
  return (
    <View className={rootClass} style={style}>
      {isNotEmpty(title) && <Divider title={title} fontColor={fontColor} lineColor={color} />}
    </View>
  );
}

EleBreakLine.defaultProps = {
  color: '#ddd',
  height: 1,
  text: '',
  fontColor: '#ddd',
  customStyle: {},
};
export default EleBreakLine;
