/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconRadio = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 1000.727273a488.727273 488.727273 0 1 1 488.727273-488.727273 488.727273 488.727273 0 0 1-488.727273 488.727273z m0-919.272728a430.545455 430.545455 0 1 0 430.545455 430.545455A430.545455 430.545455 0 0 0 512 81.454545z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconRadio.defaultProps = {
  size: 18,
};

IconRadio = React.memo ? React.memo(IconRadio) : IconRadio;

export default IconRadio;
