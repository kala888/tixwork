import { View } from '@tarojs/components';
import VCodeLoginForm from './vcode-login-from';
import { useVisible } from '@/service/use-service';
import WechatMobileLoginForm from './wechat-mobile-login-from';
import NavigationService from '@/nice-router/navigation-service';
import ApiConfig from '@/utils/api-config';
import './login.less';

export default function LoginPage() {
  const { visible, toggle } = useVisible(false);

  const handleSubmit = ({ params, onCompleted }) => {
    console.log('do remote bind mobile, params', params);
    NavigationService.post(ApiConfig.BindMobile, params, { onSuccess: onCompleted });
  };

  return (
    <View className='login-page bind-mobile'>
      <View className='login-page-body'>
        <View className='login-form-brief'>绑定手机号</View>
        {visible && <WechatMobileLoginForm onSwitch={toggle} onSubmit={handleSubmit} />}
        {!visible && <VCodeLoginForm onSwitch={toggle} onSubmit={handleSubmit} submitText='确定' />}
      </View>
    </View>
  );
}
