/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconWarningCircle = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M512 688m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M488 576h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z"
        fill={getIconColor(color, 2, '#333333')}
      />
    </Svg>
  );
};

IconWarningCircle.defaultProps = {
  size: 18,
};

IconWarningCircle = React.memo ? React.memo(IconWarningCircle) : IconWarningCircle;

export default IconWarningCircle;
