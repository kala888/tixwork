/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconIconfont = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M1023.99616 42.666507a42.666507 42.666507 0 0 0-42.666507-42.666507H42.666507a42.666507 42.666507 0 0 0-30.165221 72.746394L341.332053 401.193162v323.241455c0 11.306624 4.437317 21.589252 11.647957 29.226557l86.186343 86.143677a42.666507 42.666507 0 1 0 60.373107-60.287774L426.665067 706.770683V383.486562a42.367841 42.367841 0 0 0-11.60529-29.183891v-0.085333L145.663454 85.205014h732.626586l-269.353657 269.054991v0.042666A42.367841 42.367841 0 0 0 597.331093 383.571895V980.049658a42.62384 42.62384 0 0 0 64.383759 37.973191 42.62384 42.62384 0 0 0 20.906588-37.973191V401.150496l328.873434-328.404102A42.367841 42.367841 0 0 0 1023.99616 42.62384z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconIconfont.defaultProps = {
  size: 18,
};

IconIconfont = React.memo ? React.memo(IconIconfont) : IconIconfont;

export default IconIconfont;
