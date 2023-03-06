/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconCheckbox = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M898.63543088 125.36456912v773.27086176H125.36456912V125.36456912h773.27086176m0-110.46726542H125.36456912c-60.75699579 0-110.46726541 49.71026963-110.46726542 110.46726542v773.27086176c0 60.75699579 49.71026963 110.46726541 110.46726542 110.46726542h773.27086176c60.75699579 0 110.46726541-49.71026963 110.46726542-110.46726542V125.36456912c0-60.75699579-49.71026963-110.46726541-110.46726542-110.46726542z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconCheckbox.defaultProps = {
  size: 18,
};

IconCheckbox = React.memo ? React.memo(IconCheckbox) : IconCheckbox;

export default IconCheckbox;
