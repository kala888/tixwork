/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconApp2 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M503.85580406 93.88279774h27.35940824c7.50793063 0 13.57971957 5.09012247 13.57971956 11.34370148v91.13137108c0 6.25357903-6.07178895 11.34370149-13.57971956 11.34370149h-27.35940824c-7.50793063 0-13.59789858-5.09012247-13.59789857-11.34370149V105.22649922c0-6.27175803 6.08996794-11.34370149 13.59789857-11.34370148z m299.09923169 112.56442243l19.34246537 19.34246537c5.30827056 5.30827056 5.9990729 13.21613939 1.56339474 17.65181754L759.23451961 308.06787935c-4.43567813 4.43567813-12.34354698 3.74487581-17.63363853-1.56339475l-19.36064438-19.34246537c-5.30827056-5.30827056-5.9990729-13.21613939-1.56339476-17.66999654l64.62637627-64.60819726c4.43567813-4.45385715 12.34354698-3.74487581 17.63363853 1.56339476z m125.58059275 297.40858389v27.35940824c0 7.50793063-5.09012247 13.57971957-11.34370149 13.57971956h-91.13137107c-6.25357903 0-11.34370149-6.07178895-11.3437015-13.57971956v-27.35940824c0-7.50793063 5.09012247-13.59789858 11.3437015-13.59789857h91.13137107c6.27175803 0 11.34370149 6.08996794 11.34370149 13.59789857z m-106.23812738 292.77293664l-19.34246537 19.34246535c-5.30827056 5.30827056-13.21613939 5.9990729-17.65181754 1.56339476l-64.62637627-64.60819726c-4.43567813-4.45385715-3.74487581-12.36172599 1.56339476-17.65181754l19.34246536-19.36064436c5.30827056-5.30827056 13.21613939-5.9990729 17.65181755-1.56339476l64.62637625 64.62637626c4.45385715 4.43567813 3.74487581 12.36172599-1.56339474 17.65181755z m-291.08228882 131.9068878h-27.35940824c-7.50793063 0-13.59789858-5.09012247-13.59789857-11.34370149v-91.13137107c0-6.25357903 6.08996794-11.34370149 13.59789857-11.3437015h27.35940824c7.50793063 0 13.57971957 5.09012247 13.57971956 11.3437015v91.13137107c0 6.27175803-6.07178895 11.34370149-13.57971956 11.34370149z m-305.0983046-114.12781721l-16.21567584-16.21567584a11.38005951 11.38005951 0 0 1 0-16.08842278l64.62637625-64.62637626a11.38005951 11.38005951 0 0 1 16.08842279 0l16.21567585 16.21567584a11.38005951 11.38005951 0 0 1 0 16.1066018l-64.60819724 64.60819724a11.38005951 11.38005951 0 0 1-16.10660181 0zM93.88279774 531.2152123v-27.35940824c0-7.50793063 5.09012247-13.59789858 11.34370148-13.59789857h91.13137108c6.25357903 0 11.34370149 6.08996794 11.34370149 13.59789857v27.35940824c0 7.50793063-5.09012247 13.57971957-11.34370149 13.57971956H105.22649922c-6.27175803 0-11.34370149-6.07178895-11.34370148-13.57971956z m118.89071751-305.40734775l19.34246535-19.36064438c5.30827056-5.30827056 13.21613939-5.9990729 17.65181754-1.56339474l64.62637625 64.60819726c4.43567813 4.45385715 3.74487581 12.36172599-1.56339475 17.66999654l-19.36064438 19.34246537c-5.30827056 5.30827056-13.19796039 5.9990729-17.63363851 1.56339475l-64.62637627-64.62637627c-4.45385715-4.43567813-3.74487581-12.36172599 1.54521577-17.63363853zM515.54490671 709.60582559c109.56488599 0 198.38752297-88.82263696 198.38752298-198.38752296 0-109.58306501-88.82263696-198.40570201-198.38752298-198.40570199S317.17556273 401.65341661 317.17556273 511.21830263c0 109.56488599 88.82263696 198.38752297 198.38752299 198.38752296z m0 54.53702639c-139.68750357 0-252.92454937-113.25522479-252.92454934-252.92454935 0-139.68750357 113.23704578-252.94272837 252.92454934-252.94272837s252.92454937 113.25522479 252.92454936 252.94272837c0 139.66932457-113.25522479 252.92454937-252.92454936 252.92454935zM473.69682847 416.01483357a94.07637051 94.07637051 0 0 0-1.90879592 18.90616913c0 49.91955817 38.99397386 90.38603173 87.07745211 90.38603174a84.78689702 84.78689702 0 0 0 55.15511269-20.43320589c5.16283851-4.39932014 16.72468809-2.72685132 17.48820646 3.61762275 0.67262332 5.50823967 1.01802449 11.12555338 1.01802449 16.81558314 0 72.9705413-56.97301355 132.10685692-127.25306155 132.1068569s-127.25306156-59.13631562-127.25306154-132.1068569c0-54.60974243 31.92233945-101.47522708 77.46075642-121.59938982 7.92604781-3.5085487 19.66968751 5.19919651 18.21536684 12.30718895z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconApp2.defaultProps = {
  size: 18,
};

IconApp2 = React.memo ? React.memo(IconApp2) : IconApp2;

export default IconApp2;