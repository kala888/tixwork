/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconApp09 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1072 1024" width={size} height={size} {...rest}>
      <Path
        d="M919.259429 0H104.740571A104.740571 104.740571 0 0 0 0 104.740571v814.518858C0 977.091048 46.908952 1024 104.740571 1024h814.518858A104.740571 104.740571 0 0 0 1024 919.259429V104.740571A104.740571 104.740571 0 0 0 919.259429 0z m-11.605334 954.172952H116.345905a46.518857 46.518857 0 0 1-46.518857-46.518857v-186.514285H406.186667c5.705143 48.469333 31.256381 71.289905 61.927619 71.289904 30.72 0 56.32-22.869333 61.927619-71.289904h42.325333c6.241524 47.104 31.402667 68.608 61.586286 68.608 30.134857 0 55.296-21.455238 61.537524-68.608h47.591619c5.851429 48.030476 31.305143 70.41219 61.927619 70.41219 30.573714 0 56.027429-22.381714 61.878857-70.41219h87.283809v186.514285a46.518857 46.518857 0 0 1-46.518857 46.518857z m-837.778285-302.811428V371.760762h84.50438c5.412571 48.90819 31.061333 69.680762 61.92762 69.680762 30.96381 0 56.56381-20.772571 62.025142-69.680762h44.519619c5.607619 48.469333 31.207619 69.778286 61.927619 69.778286s56.32-21.308952 61.92762-69.778286h297.203809c5.656381 48.518095 31.207619 68.85181 61.927619 68.851809 30.768762 0 56.32-20.382476 61.927619-68.851809h86.308572v279.600762h-87.186286c-5.851429-48.079238-31.305143-69.680762-61.878857-69.680762-30.573714 0-56.027429 21.601524-61.927619 69.729524h-47.152762c-5.461333-48.90819-31.110095-71.484952-61.927619-71.484953-30.96381 0-56.612571 22.576762-62.073905 71.436191h-42.032762c-6.046476-47.591619-31.402667-68.754286-61.781333-68.754286-30.329905 0-55.637333 21.113905-61.68381 68.754286H69.87581z m884.24838-348.940191h-86.55238c-6.144-47.591619-31.402667-69.973333-61.781334-69.973333-30.378667 0-55.686095 22.332952-61.732571 69.973333H446.464c-6.046476-47.591619-31.353905-69.973333-61.732571-69.973333s-55.637333 22.332952-61.732572 69.973333H277.942857c-6.241524-47.152762-31.353905-69.095619-61.537524-69.095619-30.134857 0-55.296 21.942857-61.586285 69.095619H69.827048V116.345905c0-25.697524 20.821333-46.518857 46.518857-46.518857h791.30819c25.697524 0 46.518857 20.821333 46.518857 46.518857v186.075428z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconApp09.defaultProps = {
  size: 18,
};

IconApp09 = React.memo ? React.memo(IconApp09) : IconApp09;

export default IconApp09;