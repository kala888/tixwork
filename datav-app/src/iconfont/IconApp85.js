/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconApp85 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M548 496v64H704a16 16 0 0 1 16 16v48a16 16 0 0 1-16 16H548v124a16 16 0 0 1-16 16h-48a16 16 0 0 1-16-16V640H320a16 16 0 0 1-16-16v-48a16 16 0 0 1 16-16h148v-64H320a16 16 0 0 1-16-16v-48a16 16 0 0 1 16-16h110.504l-91.76-91.76a16 16 0 0 1 0-22.624l33.944-33.944a16 16 0 0 1 22.624 0l109.256 109.256 109.256-109.256a16 16 0 0 1 22.624 0l33.944 33.944a16 16 0 0 1 0 22.624L578.632 416H704a16 16 0 0 1 16 16v48a16 16 0 0 1-16 16H548zM512 968C260.16 968 56 763.84 56 512S260.16 56 512 56s456 204.16 456 456-204.16 456-456 456z m0-80c207.656 0 376-168.344 376-376S719.656 136 512 136 136 304.344 136 512s168.344 376 376 376z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconApp85.defaultProps = {
  size: 18,
};

IconApp85 = React.memo ? React.memo(IconApp85) : IconApp85;

export default IconApp85;
