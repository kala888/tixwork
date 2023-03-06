/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconRadioChecked = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M504.364385 16.445242c-278.216885 0-503.756235 225.53935-503.756235 503.756235s225.53935 503.756235 503.756235 503.756235 503.756235-225.53935 503.756235-503.756235S782.58127 16.445242 504.364385 16.445242zM406.070511 739.739869 231.325844 564.928749l65.52925-65.554422 109.215417 109.257705 305.803166-305.919964 65.52925 65.554422L406.070511 739.739869z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconRadioChecked.defaultProps = {
  size: 18,
};

IconRadioChecked = React.memo ? React.memo(IconRadioChecked) : IconRadioChecked;

export default IconRadioChecked;
