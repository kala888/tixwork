import EleButton from '@/components/elements/ele-button';
import { useEffect, useState } from 'react';
import LoginUtils from './login-utils';
import ObjectUtils from '@/utils/object-utils';
import AuthTools from '@/utils/auth-tools';
import GlobalToast from '@/components/global-popup/global-toast';
import './login.less';

export default function WechatLoginForm(props) {
  const { onSuccess } = props;

  const [code, setCode] = useState('');

  useEffect(() => {
    LoginUtils.getCode().then(setCode);
  }, []);

  const handleSubmit = async (e) => {
    const theTokenIsLoginToken = await AuthTools.isLoginToken();
    console.log('Is an validate login token??', theTokenIsLoginToken);

    const onCompleted = () => LoginUtils.getCode().then(setCode);
    // todo wechat_work_app 未实现，未测试
    const grantType = LoginUtils.isQYWechat() ? 'wechat_work_app' : 'mp';
    const { encryptedData, iv } = e.detail;
    const params = { encryptedData, iv, code, grantType, wechatLoginType: 'wechat' };
    if (ObjectUtils.isEmpty(encryptedData)) {
      console.log('用户拒绝了授权');
      return;
    }
    try {
      await LoginUtils.getWxObj().checkSession();
      await LoginUtils.remoteLogin({ params, onCompleted, onSuccess });
    } catch (err) {
      console.log(err);
      GlobalToast.show({ text: '登录失败，稍后重试!!!' });
      onCompleted().then();
    }
  };
  return (
    <EleButton className='login-button' openType='getUserInfo' onGetUserInfo={handleSubmit}>
      微信登录
    </EleButton>
  );
}
