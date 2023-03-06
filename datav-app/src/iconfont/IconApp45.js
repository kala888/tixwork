/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconApp45 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M480 896V250.4L237.6 493.6 192 448l274.4-274.4L512 128l45.6 45.6L832 448l-45.6 45.6L544 250.4V896h-64z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconApp45.defaultProps = {
  size: 18,
};

IconApp45 = React.memo ? React.memo(IconApp45) : IconApp45;

export default IconApp45;
