import ServerImage from '@/server-image/server-image';
import { Text, View } from '@tarojs/components';
import { useVisible } from '@/service/use-service';
import Config from '@/utils/config';

import loginLogo from '../../assets/login-logo.png';
import VCodeLoginForm from './vcode-login-from';
import PasswordLoginForm from './password-login-from';
import WechatLoginForm from './wechat-login-form';

import WechatMobileLoginForm from './wechat-mobile-login-from';
import './login.less';

export default function LoginPage() {
  const { visible, toggle } = useVisible(false);

  const loginMode = Config.loginMode;
  return (
    <View className='login-page'>
      <View className='login-page-header'>
        <View className='login-page-header-txt'>
          <Text>{Config.name}</Text>
        </View>
        <View className='login-page-header-logo'>
          <ServerImage src={loginLogo} />
        </View>
      </View>

      <View className='login-page-body'>
        <View className='login-form-brief'>WELCOME TO LOGIN</View>
        <View className='form-form-title'>欢迎登录</View>

        {loginMode === 'wechat' && <WechatLoginForm />}
        {loginMode === 'mobile' && visible && <WechatMobileLoginForm onSwitch={toggle} />}
        {loginMode === 'mobile' && !visible && <VCodeLoginForm onSwitch={toggle} />}
        {loginMode === 'account' && <PasswordLoginForm />}
      </View>
    </View>
  );
}
