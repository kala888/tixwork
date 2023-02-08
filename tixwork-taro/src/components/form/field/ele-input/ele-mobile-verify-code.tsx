import { useCountdown } from '@/service/use-service';
import { View } from '@tarojs/components';
import classNames from 'classnames';
import { isNotEmpty } from '@/utils/object-utils';
import './styles.less';
import GlobalToast from '@/components/global-popup/global-toast';
import Q from '@/http/q';
import EleInput, { EleInputType } from '@/components/form/field/ele-input';

type EleMobileVerifyCodeProps = {
  maxCount?: number;
  className?: string;
  linkToUrl?: string;
  value?: string;
  onChange: Function;
} & EleInputType;

function EleMobileVerifyCode(props: EleMobileVerifyCodeProps) {
  const { maxCount = 60, value = '', className, linkToUrl = '', ...others } = props;

  const { second, counting, startCount } = useCountdown(maxCount);

  const sendCode = async () => {
    if (!/^1\d{10}$/.test(value)) {
      GlobalToast.show({
        text: '手机号码有误！',
      });
      return;
    }
    if (isNotEmpty(linkToUrl)) {
      startCount();
      console.log('props...', props);
      await Q.get(linkToUrl, { mobile: props.value });
      // NavigationService.ajax(linkToUrl, { mobile: props.value });
    }
  };

  const tips = counting ? `${second}秒...` : '获取验证码';
  const rootClass = classNames('ele-vcode', className);
  const txtClass = classNames('ele-vcode-txt', { 'ele-vcode-txt-disabled': counting });
  return (
    <EleInput type='text' maxlength={6} {...others} className={rootClass}>
      <View className={txtClass} onClick={sendCode}>
        {tips}
      </View>
    </EleInput>
  );
}

export default EleMobileVerifyCode;
