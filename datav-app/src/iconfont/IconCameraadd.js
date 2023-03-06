/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconCameraadd = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M480 352c-105.888 0-192 86.112-192 192s86.112 192 192 192 192-86.112 192-192S585.888 352 480 352zM480 672c-70.592 0-128-57.408-128-128 0-70.592 57.408-128 128-128 70.592 0 128 57.408 128 128C608 614.592 550.592 672 480 672z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M576 832 160 832c-17.632 0-32-14.336-32-32L128 288c0-17.632 14.368-32 32-32l96 0c17.664 0 32-14.336 32-32S273.664 192 256 192L160 192C107.072 192 64 235.072 64 288l0 512c0 52.928 43.072 96 96 96l416 0c17.696 0 32-14.304 32-32S593.696 832 576 832z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M512 256l320 0c17.664 0 32 14.368 32 32l0 256c0 17.696 14.304 32 32 32s32-14.304 32-32L928 288c0-52.928-43.072-96-96-96L512 192c-17.664 0-32 14.336-32 32S494.336 256 512 256z"
        fill={getIconColor(color, 2, '#333333')}
      />
      <Path
        d="M784 336m-48 0a1.5 1.5 0 1 0 96 0 1.5 1.5 0 1 0-96 0Z"
        fill={getIconColor(color, 3, '#333333')}
      />
      <Path
        d="M320 160l128 0c17.696 0 32-14.304 32-32s-14.304-32-32-32l-128 0C302.304 96 288 110.304 288 128S302.304 160 320 160z"
        fill={getIconColor(color, 4, '#333333')}
      />
      <Path
        d="M960 768l-96 0 0-96c0-17.696-14.304-32-32-32s-32 14.304-32 32l0 96-96 0c-17.696 0-32 14.304-32 32s14.304 32 32 32l96 0 0 96c0 17.696 14.304 32 32 32s32-14.304 32-32l0-96 96 0c17.696 0 32-14.304 32-32S977.696 768 960 768z"
        fill={getIconColor(color, 5, '#333333')}
      />
    </Svg>
  );
};

IconCameraadd.defaultProps = {
  size: 18,
};

IconCameraadd = React.memo ? React.memo(IconCameraadd) : IconCameraadd;

export default IconCameraadd;
