/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconApp26 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M418.24 448h-55.296l-39.488-105.984h-161.28L124.992 448h-55.296L217.216 60.736h53.504L418.24 448zM307.968 298.24l-58.496-160.96a180.352 180.352 0 0 1-6.016-27.008h-1.28c-1.792 11.648-3.84 20.608-6.208 27.008L177.984 298.24h129.984zM668.288 960V568.512h136c40.64 0 73.152 8.192 97.344 24.64 24.32 16.448 36.48 38.272 36.48 65.344 0 21.568-7.232 40.576-21.696 57.152-14.464 16.512-34.304 28.16-59.648 35.136v1.024c31.488 3.008 56.64 13.056 75.52 30.208 18.816 17.152 28.16 38.784 28.16 65.088 0 33.728-14.272 60.992-42.88 81.792-28.416 20.736-65.088 31.104-109.696 31.104h-139.584z m59.84-347.264v122.56h54.4c28.864 0 51.584-5.952 67.968-17.792a57.6 57.6 0 0 0 24.704-49.408c0-36.864-29.056-55.296-87.232-55.296h-59.84z m0 166.592v136.448h71.68c31.232 0 55.424-6.08 72.512-18.304a59.072 59.072 0 0 0 25.472-50.944c0-44.8-35.968-67.2-107.904-67.2h-61.76zM448 858.24l6.4-37.76A349.632 349.632 0 0 1 192 512h64a288.64 288.64 0 0 0 209.92 245.76l9.6-53.76 119.68 101.12-147.2 53.12z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconApp26.defaultProps = {
  size: 18,
};

IconApp26 = React.memo ? React.memo(IconApp26) : IconApp26;

export default IconApp26;