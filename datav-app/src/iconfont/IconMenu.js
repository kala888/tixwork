/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconMenu = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M92 92l840 0C965.104 92 992 118.864 992 152c0 33.136-26.896 60-60 60L92 212C58.864 212 32 185.136 32 152 32 118.864 58.864 92 92 92z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M92 452l840 0c33.104 0 60 26.864 60 60 0 33.104-26.896 60-60 60L92 572C58.864 572 32 545.104 32 512 32 478.864 58.864 452 92 452z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M92 812l840 0c33.104 0 60 26.896 60 60s-26.896 60-60 60L92 932C58.864 932 32 905.104 32 872S58.864 812 92 812z"
        fill={getIconColor(color, 2, '#333333')}
      />
    </Svg>
  );
};

IconMenu.defaultProps = {
  size: 18,
};

IconMenu = React.memo ? React.memo(IconMenu) : IconMenu;

export default IconMenu;
