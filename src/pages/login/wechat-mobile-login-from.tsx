import { View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import { noop } from '@/utils';
import EleButton from '@/components/elements/ele-button';
import { isEmpty } from '@/utils/object-utils';
import LoginUtils from './login-utils';
import './login.less';
import GlobalToast from '@/components/global-popup/global-toast';

export default function WechatMobileLoginForm(props) {
  const { onShowVCode = noop, onSubmit } = props;

  const [code, setCode] = useState('');

  useEffect(() => {
    LoginUtils.getCode().then(setCode);
  }, []);

  const handleSubmit = async (e) => {
    const onCompleted = () => LoginUtils.getCode().then(setCode);
    const { encryptedData, iv } = e.detail;
    if (isEmpty(encryptedData)) {
      console.log('用户拒绝了授权');
      return;
    }
    const params = { encryptedData, iv, code, loginMethod: 'wechat_mobile' };
    try {
      await LoginUtils.getWxObj().checkSession();
      const remoteCall = onSubmit ? onSubmit : LoginUtils.remoteLogin;
      remoteCall({ params, onCompleted });
    } catch (err) {
      GlobalToast.show({ text: '微信登录失败，稍后重试！' });
      onCompleted().then();
    }
  };

  return (
    <>
      <EleButton openType='getPhoneNumber' className='login-button' onGetPhoneNumber={handleSubmit}>
        使用微信绑定的手机号
      </EleButton>
      <View className='login-form-fields-switch'>
        <EleButton mode='ghost' onClick={onShowVCode}>
          其他手机号码
        </EleButton>
      </View>
    </>
  );
}
