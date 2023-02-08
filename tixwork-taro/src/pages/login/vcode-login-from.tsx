import MobileVerifyCode from '@/components/mobile-verify-code';
import EleInput from '@/components/form/field/ele-input';
import { View } from '@tarojs/components';
import { useState } from 'react';
import _ from 'lodash';
import { isNotEmpty } from '@/utils/object-utils';
import EleButton from '@/components/elements/ele-button';
import { noop } from '@/utils';
import './login.less';
import LoginUtils from './login-utils';

export default function VCodeLoginForm(props) {
  const { onSwitch = noop, onSubmit, submitText = '登录' } = props;

  const [mobile, setMobile] = useState();
  const [verifyCode, setVerifyCode] = useState<any>();

  const handleSubmit = () => {
    const params = {
      mobile,
      code: verifyCode,
      loginMethod: 'mobile_vcode',
    };
    const remoteCall = onSubmit ? onSubmit : LoginUtils.remoteLogin;
    remoteCall({ params });
  };

  const handleSendCodeSuccess = (resp) => {
    const txt = _.get(resp, 'toast.text', '');
    const theCode = _.get(txt.match(/验证码(\d{6})/), 1);
    console.log('text', txt, theCode);
    if (isNotEmpty(theCode)) {
      setVerifyCode(theCode);
    }
  };

  return (
    <>
      <View className='login-form-fields'>
        <MobileVerifyCode
          name='mobile'
          className='login-form-fields-input'
          placeholder='请输入手机号'
          value={mobile}
          onChange={setMobile}
          onSendCodeSuccess={handleSendCodeSuccess}
        />
        <EleInput
          name='verifyCode'
          className='login-form-fields-input,login-form-fields-vcode'
          placeholder='请输入验证码'
          type='number'
          value={verifyCode}
          onChange={setVerifyCode}
        />
      </View>
      <View className='login-form-fields-switch'>
        <EleButton mode='ghost' onClick={onSwitch}>
          使用微信绑定手机号
        </EleButton>
      </View>

      <EleButton className='login-button' onClick={handleSubmit}>
        {submitText}
      </EleButton>
    </>
  );
}
