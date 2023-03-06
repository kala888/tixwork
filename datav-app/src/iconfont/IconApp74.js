/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconApp74 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M153.4 948.1h186.5c18.3 0 33.2-14.6 33.2-32.6s-14.8-32.6-33.2-32.6H155.4V369.5l345.5-232.3 349.9 244.7v162.8c0 18 14.8 32.6 33.2 32.6 18.3 0 33.2-14.6 33.2-32.6v-164c0-20.4-10.1-39.6-27-51.4l-352-246c-21.9-15.3-51.4-15.6-73.6-0.7L117.1 316.3c-17.5 11.8-27.9 31.2-27.9 52.1V885c-0.1 34.8 28.7 63.1 64.2 63.1z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M842.1 782.3h-348c-17.6 0-32-14.4-32-32s14.4-32 32-32h348c17.6 0 32 14.4 32 32s-14.4 32-32 32z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M735.1 939.8c-7.8 0-15.7-2.9-21.8-8.6-12.9-12.1-13.6-32.3-1.5-45.2l128.7-137.7-135.3-132.6c-12.6-12.4-12.8-32.6-0.4-45.3 12.4-12.6 32.6-12.8 45.3-0.4l157.5 154.5c12.4 12.2 12.8 32 1 44.7l-150 160.5c-6.4 6.7-15 10.1-23.5 10.1z"
        fill={getIconColor(color, 2, '#333333')}
      />
    </Svg>
  );
};

IconApp74.defaultProps = {
  size: 18,
};

IconApp74 = React.memo ? React.memo(IconApp74) : IconApp74;

export default IconApp74;
