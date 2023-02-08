import { Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import _ from 'lodash';
import { noop } from '@/utils';
import { isNotEmpty } from '@/utils/object-utils';
import EleButton from '@/components/elements/ele-button';

import './styles.less';
import GlobalToast from '@/components/global-popup/global-toast';

type EleQrScanProps = {
  value: string;
  disabled?: boolean;
  onChange?: (result: string) => void;
};

function EleQrScan(props: EleQrScanProps) {
  const { value = '', disabled, onChange = noop } = props;

  const handleScan = async () => {
    const { result } = await Taro.scanCode({});
    if (isNotEmpty(result)) {
      await GlobalToast.show({ text: '扫码成功' });
      onChange(result);
    }
  };

  let displayValue = value || '';
  if (displayValue.indexOf('_d=') > -1) {
    displayValue = displayValue.substr(displayValue.indexOf('_d=') + 3, displayValue.length);
  } else if (displayValue.length >= 10) {
    displayValue = displayValue.substr(displayValue.length - 10, 10);
  }

  return (
    <View className='ele-qr-scan'>
      <View className='ele-qr-scan-value'>{_.trim(displayValue)}</View>
      <EleButton size='small' mode='ghost' disabled={disabled} onClick={handleScan}>
        <Text className='iconfont iconfont-scan' />
      </EleButton>
    </View>
  );
}

export default EleQrScan;
