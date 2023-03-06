/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconHeart = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M797.184 518.496L512.8 812.512l-284.16-292A162.752 162.752 0 0 1 192 417.6c0-89.088 71.808-161.6 160-161.6a159.36 159.36 0 0 1 133.28 72.16L512 368.64l26.72-40.48A159.488 159.488 0 0 1 672 256c88.224 0 160 72.512 160 161.6 0 37.536-12.992 74.08-34.816 100.896M672 192a222.72 222.72 0 0 0-160 67.712A222.624 222.624 0 0 0 352 192c-123.52 0-224 101.216-224 225.6 0 52.288 18.176 103.232 52.96 145.536L466.912 857.12A62.4 62.4 0 0 0 512 876.288c17.12 0 33.12-6.816 45.12-19.136l287.744-296.064A226.816 226.816 0 0 0 896 417.6C896 293.216 795.52 192 672 192"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconHeart.defaultProps = {
  size: 18,
};

IconHeart = React.memo ? React.memo(IconHeart) : IconHeart;

export default IconHeart;
