/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconApp24 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M63.985 173.905v784.417h896.477V173.905H63.985z m336.179 504.269v-168.09h224.12v168.09h-224.12z m224.12 56.029v168.09h-224.12v-168.09h224.12z m0-448.238v168.09h-224.12v-168.09h224.12z m-280.15 0v168.09H120.016v-168.09h224.12z m-224.119 224.12h224.12v168.089h-224.12v-168.09z m560.298 0h224.12v168.089h-224.12v-168.09z m0-56.03v-168.09h224.12v168.09h-224.12zM120.015 734.202h224.12v168.09h-224.12v-168.09z m560.298 168.09v-168.09h224.12v168.09h-224.12z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconApp24.defaultProps = {
  size: 18,
};

IconApp24 = React.memo ? React.memo(IconApp24) : IconApp24;

export default IconApp24;
