/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconApp41 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M705.2 710.8c128.4-128.4 128.4-336.5 0-464.8s-336.5-128.4-464.8 0-128.4 336.5 0 464.8 336.4 128.4 464.8 0z m22.4 45.2c-147.8 135.9-377.9 132.2-521.3-11.1-147.1-147.2-147.1-385.7 0.1-532.9S592 64.9 739.2 212c139.5 139.5 146.7 361.2 21.7 509.2l160 160c9.4 9.4 9.4 24.6 0 34s-24.6 9.4-34 0L727.6 756z"
        fill={getIconColor(color, 0, '#666666')}
      />
    </Svg>
  );
};

IconApp41.defaultProps = {
  size: 18,
};

IconApp41 = React.memo ? React.memo(IconApp41) : IconApp41;

export default IconApp41;
