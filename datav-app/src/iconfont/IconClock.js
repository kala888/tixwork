/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconClock = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 512m-426.666667 0a426.666667 426.666667 0 1 0 853.333334 0 426.666667 426.666667 0 1 0-853.333334 0Z"
        fill={getIconColor(color, 0, '#00ACC1')}
      />
      <Path
        d="M512 512m-341.333333 0a341.333333 341.333333 0 1 0 682.666666 0 341.333333 341.333333 0 1 0-682.666666 0Z"
        fill={getIconColor(color, 1, '#EEEEEE')}
      />
      <Path
        d="M490.666667 234.666667h42.666666v277.333333h-42.666666z"
        fill={getIconColor(color, 2, '#333333')}
      />
      <Path
        d="M667.413333 632.618667L632.746667 667.306667l-138.752-138.752 34.688-34.709334z"
        fill={getIconColor(color, 3, '#333333')}
      />
      <Path
        d="M512 512m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z"
        fill={getIconColor(color, 4, '#333333')}
      />
      <Path
        d="M512 512m-21.333333 0a21.333333 21.333333 0 1 0 42.666666 0 21.333333 21.333333 0 1 0-42.666666 0Z"
        fill={getIconColor(color, 5, '#00ACC1')}
      />
    </Svg>
  );
};

IconClock.defaultProps = {
  size: 18,
};

IconClock = React.memo ? React.memo(IconClock) : IconClock;

export default IconClock;
