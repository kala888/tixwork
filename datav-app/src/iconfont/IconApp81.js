/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconApp81 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M321.2 468.1l-22.6 56.3-8.4 21.1 15.4 16.6 51.4 55.5-29.2 30.2-20.8 21.5 17.4 24.3 5.8 8.1-252.3 40.5L41.2 513l280-44.9M345 428L0.1 483.3l48.1 299.9 344.9-55.3-39.6-55.2 52.8-54.6-74.4-80.3 33-82.2L345 428zM553.3 481l426.9 114.4-60.1 224.2L462.7 697l-3.2-15.5 42.7-17.1 31.5-12.6-10.9-32.1-27.8-82.4 47.4-45.8 10.9-10.5m-42.6-48.5l6.8 33.3-63.7 61.6 35.1 103.7-70.5 28.3 13.6 66.5 513.4 137.6 78.6-293.4-513.3-137.6zM234.198 295.21l28.622-29.356 67.949 66.25-28.622 29.356zM533.454 359.228l66.25-67.948 29.356 28.622-66.25 67.948zM411.8 160.8h41v148.8h-41z"
        fill={getIconColor(color, 0, '#303030')}
      />
    </Svg>
  );
};

IconApp81.defaultProps = {
  size: 18,
};

IconApp81 = React.memo ? React.memo(IconApp81) : IconApp81;

export default IconApp81;
