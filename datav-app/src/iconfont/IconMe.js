/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconMe = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M716.28125 563.65625c-52.40625 51.1875-120.46875 85.3125-199.03125 85.3125-78.5625 0-146.625-34.125-204.28125-85.3125C182.09375 637.53125 93.03125 734.1875 93.03125 910.4375H931.0625c0-176.25-89.0625-267.1875-214.78125-346.78125zM512 575.5625c125.15625 0 225.375-105.1875 225.375-230.34375S637.25 114.875 512 114.875 286.71875 219.96875 286.71875 345.21875c0 130.125 105.09375 230.34375 225.28125 230.34375z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconMe.defaultProps = {
  size: 18,
};

IconMe = React.memo ? React.memo(IconMe) : IconMe;

export default IconMe;
