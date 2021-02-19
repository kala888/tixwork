import viewConfig from './viewmapping.config';
import { BaseAppConfiguration } from '@/nice-router/nice-router.config';

const baseURL = 'https://demo2.doublechaintech.com/repairchain/wxappService/'; //后端服务地址

const Config: BaseAppConfiguration = {
  name: 'NiceRouter App Start',
  baseURL,
  version: 1,
  appType: 'mini-program',
  viewConfig,
  backendRouterPageKeyBlackList: ['refreshPage/', 'goBack/', 'goPrevious/'],
  backendRouterPageBlackList: ['NetworkException'],
  api: {
    FooterHome: 'viewHomepage/',
    FooterMe: 'customerViewDashboard/',

    Login: 'clientLogin/',
    WxLogin: 'wxappService/wxlogin/:code/',
    VerifyCode: 'sendVerifyCode/:mobile/',
    OSSToken: 'customGetOssToken/',
    Logout: 'logout/',
  },
  // loginMode: 'wechat',
  // loginMode: 'vcode', //包含绑定的微信登录
  loginMode: 'password',
};

console.log('***********   current env  ***********   ');
console.log('config.js is', Config);
export default Config;
