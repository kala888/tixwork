/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconApp21 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M551.903 52.773v21.745h25.205c0.722 3.627 1.452 7.97 1.452 11.592v59.439c52.184 16.678 90.614 91.336 90.614 149.323v667.206a32.494 32.494 0 0 1-32.627 32.62H407.478a32.48 32.48 0 0 1-32.62-32.62V294.872c0-57.987 37.687-132.645 90.614-149.323V86.103c0-4.344 0.722-7.971 1.452-11.592h25.198V20.875h59.78v31.898z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M551.903 52.773v21.745h25.205c0.722 3.627 1.452 7.97 1.452 11.592v59.439c52.184 16.678 90.614 91.336 90.614 149.323v667.206a32.494 32.494 0 0 1-32.627 32.62H407.478a32.48 32.48 0 0 1-32.62-32.62V294.872c0-57.987 37.687-132.645 90.614-149.323V86.103c0-4.344 0.722-7.971 1.452-11.592h25.198V20.875h59.78v31.898z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconApp21.defaultProps = {
  size: 18,
};

IconApp21 = React.memo ? React.memo(IconApp21) : IconApp21;

export default IconApp21;
