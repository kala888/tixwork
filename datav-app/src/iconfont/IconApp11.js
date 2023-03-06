/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconApp11 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M853.333333 597.333333v85.333334H376.661333l111.317334 110.336L427.648 853.333333 170.666667 597.333333h682.666666zM596.352 170.666667L853.333333 426.666667H170.666667V341.333333h476.672l-111.317334-110.336L596.352 170.666667z"
        fill={getIconColor(color, 0, '#000000')}
      />
    </Svg>
  );
};

IconApp11.defaultProps = {
  size: 18,
};

IconApp11 = React.memo ? React.memo(IconApp11) : IconApp11;

export default IconApp11;
