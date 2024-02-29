import ServerImage from '@/server-image/server-image';
import { Text, View } from '@tarojs/components';
import { useVisible } from '@/service/use-service';
import Config from '@/utils/config';

import loginLogo from '../../assets/login-logo.png';
import VCodeLoginForm from './vcode-login-from';
import WechatLoginForm from './wechat-login-form';
import PasswordLoginForm from './password-login-from';

import WechatMobileLoginForm from './wechat-mobile-login-from';
import './login.less';
import NavigationService from '@/nice-router/navigation-service';
import Taro from '@tarojs/taro';

// 如果传入redirect则执行redirect，否则执行默认行为：判断response中是否是ActionLike，否则直接回退
export default function LoginPage() {
  const { redirect } = Taro.useRouter().params;

  const onSuccess = redirect
    ? () => {
        const linkToUrl = decodeURIComponent(redirect);
        NavigationService.view(linkToUrl);
      }
    : undefined;

  const { visible, toggle } = useVisible(true);

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

        {loginMode === 'wechat' && <WechatLoginForm onSuccess={onSuccess} />}
        {loginMode === 'wechat-mobile' && <WechatMobileLoginForm onSwitch={toggle} onSuccess={onSuccess} />}
        {loginMode === 'mobile' && visible && <WechatMobileLoginForm onSwitch={toggle} onSuccess={onSuccess} />}
        {loginMode === 'mix-mobile' && !visible && <VCodeLoginForm onSwitch={toggle} onSuccess={onSuccess} />}
        {loginMode === 'password' && <PasswordLoginForm onSuccess={onSuccess} />}
      </View>
    </View>
  );
}
