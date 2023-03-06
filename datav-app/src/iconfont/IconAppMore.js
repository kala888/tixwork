/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconAppMore = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 512m-91.02222187 0a91.02222187 91.02222187 0 1 0 182.04444374 0 91.02222187 91.02222187 0 1 0-182.04444374 0Z"
        fill={getIconColor(color, 0, '#222222')}
      />
      <Path
        d="M832 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"
        fill={getIconColor(color, 1, '#222222')}
      />
      <Path
        d="M192 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"
        fill={getIconColor(color, 2, '#222222')}
      />
    </Svg>
  );
};

IconAppMore.defaultProps = {
  size: 18,
};

IconAppMore = React.memo ? React.memo(IconAppMore) : IconAppMore;

export default IconAppMore;
