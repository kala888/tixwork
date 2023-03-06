/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconCheckboxChecked = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M898.63543088 14.8973037H125.36456912a110.46726541 110.46726541 0 0 0-110.46726542 110.46726542v773.27086176a110.46726541 110.46726541 0 0 0 110.46726542 110.46726542h773.27086176a110.46726541 110.46726541 0 0 0 110.46726542-110.46726542V125.36456912a110.46726541 110.46726541 0 0 0-110.46726542-110.46726542z m-497.10269629 773.27086048l-276.16816547-276.16816418 77.87942241-77.87942242L401.53273459 631.85698387l419.22327388-419.22327389L898.63543088 291.06546788l-497.10269629 497.1026963z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconCheckboxChecked.defaultProps = {
  size: 18,
};

IconCheckboxChecked = React.memo ? React.memo(IconCheckboxChecked) : IconCheckboxChecked;

export default IconCheckboxChecked;
