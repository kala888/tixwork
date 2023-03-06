/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconIconShare = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M801.824 291.536c-221.184 23.568-421.104 212.544-459.888 424.08a36 36 0 1 1-70.848-12.96c42.72-233.04 252.48-439.2 493.776-478.752l-110.448-64.848a36 36 0 0 1 36.48-62.112l209.376 122.976a36 36 0 0 1 9.504 54l-160.08 193.728a36 36 0 1 1-55.488-45.888l107.616-130.224z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M812 613.328a36 36 0 0 1 72 0v148.32c0 80.592-57.744 147.984-132 147.984H224c-74.256 0-132-67.392-132-148.032V313.616c0-80.64 57.744-147.984 132-147.984h206.448a36 36 0 1 1 0 72H224c-31.776 0-60 32.88-60 75.984V761.6c0 43.104 28.224 76.032 60 76.032h528c31.776 0 60-32.928 60-76.032v-148.272z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconIconShare.defaultProps = {
  size: 18,
};

IconIconShare = React.memo ? React.memo(IconIconShare) : IconIconShare;

export default IconIconShare;
