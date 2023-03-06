/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconApp13 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M860.8 448l-9.6 0c3.2-19.2 6.4-41.6 6.4-64 0-188.8-153.6-336-345.6-336s-345.6 147.2-345.6 336c0 22.4 3.2 41.6 6.4 64l-12.8 0c-54.4 0-96 41.6-96 96l0 320c0 54.4 41.6 96 96 96l700.8 0c54.4 0 96-41.6 96-96l0-320C956.8 489.6 915.2 448 860.8 448zM220.8 444.8c-3.2-19.2-6.4-38.4-6.4-60.8 0-163.2 131.2-288 294.4-288s294.4 128 294.4 288c0 22.4-3.2 44.8-6.4 64l-32 0L224 448 220.8 444.8zM908.8 864c0 25.6-22.4 48-48 48L160 912c-25.6 0-48-22.4-48-48l0-320c0-25.6 22.4-48 48-48l608 0 89.6 0c25.6 0 48 22.4 48 48L905.6 864z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M512 592c-12.8 0-25.6 9.6-25.6 25.6l0 195.2c0 12.8 9.6 25.6 25.6 25.6s25.6-9.6 25.6-25.6l0-195.2C537.6 604.8 524.8 592 512 592z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconApp13.defaultProps = {
  size: 18,
};

IconApp13 = React.memo ? React.memo(IconApp13) : IconApp13;

export default IconApp13;
