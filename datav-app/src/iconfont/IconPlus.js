/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconPlus = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M480.256 128l0 768 62.464 0 1.024-768-63.488 0zM896 480.256l-768 0 0 62.464 768 1.024 0-63.488z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconPlus.defaultProps = {
  size: 18,
};

IconPlus = React.memo ? React.memo(IconPlus) : IconPlus;

export default IconPlus;
