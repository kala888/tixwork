/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconIconEdit = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1026 1024" width={size} height={size} {...rest}>
      <Path
        d="M354.36369254 664.32566339l42.95604636-94.17018768 54.24007504 52.3652166-97.1961214 41.80497108z m74.0176456-132.59169371l283.04249944-272.58689738 63.34403609 61.88775082-282.51928354 271.98519869-63.867252-61.28605213z m424.8951198-286.51316701l-39.01448501 37.36635375-63.23067213-61.88775082 38.39534535-36.76465583c6.18267082-6.14778967 18.1032786-5.03159555 24.83532678 1.65685175l37.29659219 35.67462084c3.9764425 3.88923998 6.23499218 8.92955601 6.23499218 13.93499088 0.00872048 3.89796046-1.70045262 7.23782387-4.51709936 10.01958943zM358.88951238 526.13555659c-0.57553803 0.59297822-1.13363508 1.14235556-1.7091731 2.23238901L317.05838064 670.52577518c-2.25854967 8.32785729 0 17.25741254 6.23499217 23.41392268 5.08391691 4.464778 11.28402869 7.17678126 18.06839821 7.17678203 2.26727017 0 3.95028182-0.54065687 6.20883151-1.08131373l146.88421591-38.43022651h0.61041842a6.21755198 6.21755198 0 0 0 4.4734985-1.68301243l392.20283025-377.90158834c11.80724458-11.12706384 18.04223678-26.17824806 18.04223754-42.91244547 0-18.94042497-8.4412205-37.88084992-22.56805739-51.81584004l-37.29659142-35.6746216c-14.68493317-13.9349901-33.93928782-22.28900809-53.74301982-22.28900809-17.44053884 0-33.32886941 6.13034947-44.57801618 17.82423085L359.43888896 524.44382445c-0.54937734 0.54065687-0.54937734 1.14235556-0.54937657 1.69173214zM194.46011491 116.4921875C151.53022925 116.4921875 116.4921875 151.02445354 116.4921875 193.39624215V829.89741643c0 42.33690745 35.03804175 76.90405466 77.96792742 76.90405388h622.67954735c42.92988567 0 77.91560605-34.5671472 77.91560607-76.90405389V423.58519025h-66.65773882v348.95029441c0 37.88956965-31.07031973 67.93089778-68.91628773 67.93089777H252.09237473c-37.85468926 0-68.91628773-30.04132736-68.91628851-67.93089777V250.25239745c0-37.34019308 31.06159925-68.00937982 68.91628851-68.00937982h353.72028239V116.4921875H194.46011491z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconIconEdit.defaultProps = {
  size: 18,
};

IconIconEdit = React.memo ? React.memo(IconIconEdit) : IconIconEdit;

export default IconIconEdit;