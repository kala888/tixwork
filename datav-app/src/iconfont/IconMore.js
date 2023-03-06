/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconMore = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M238.506667 316.16L298.666667 256l256.00000001 256-256.00000001 256-60.16-60.16L433.91999999 512l-195.41333299-195.84m256 0L554.666667 256l256 256-256 256-60.16-60.16L689.92 512l-195.413333-195.84z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconMore.defaultProps = {
  size: 18,
};

IconMore = React.memo ? React.memo(IconMore) : IconMore;

export default IconMore;
