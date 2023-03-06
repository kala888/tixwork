/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconHeart2 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M938.666667 362.666667A234.666667 234.666667 0 0 0 704 128 271.36 271.36 0 0 0 512 216.32 271.36 271.36 0 0 0 320 128 234.666667 234.666667 0 0 0 85.333333 362.666667c0 167.253333 202.666667 352 298.666667 448l97.28 97.28a32 32 0 0 0 22.613333 9.386666h16.213334a32 32 0 0 0 22.613333-9.386666L640 810.666667c96-96 298.666667-280.746667 298.666667-448z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconHeart2.defaultProps = {
  size: 18,
};

IconHeart2 = React.memo ? React.memo(IconHeart2) : IconHeart2;

export default IconHeart2;
