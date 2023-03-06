/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconGoBack = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M462.51066491 325.82583417V119.22749984A15.71090034 15.71090034 0 0 0 433.44549969 104.30214466l-432.04975102 392.77250015a15.71090034 15.71090034 0 0 0 0 23.56635052l432.04975102 392.77250016a15.71090034 15.71090034 0 0 0 26.70852975-10.99762941v-189.31634507a688.13742182 688.13742182 0 0 1 516.10306603 148.46800529 15.71090034 15.71090034 0 0 0 25.13744081-15.71090033c-27.4940749-131.9715598-147.68246015-520.03079041-538.88387137-520.0307918z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconGoBack.defaultProps = {
  size: 18,
};

IconGoBack = React.memo ? React.memo(IconGoBack) : IconGoBack;

export default IconGoBack;
