import viewConfig from './viewmapping.config'

const baseURL = 'https://demo2.doublechaintech.com/storedev/wxappService/' //后端服务地址

const niceRouterConfig = {
  name: '双链科技',
  baseURL,
  version: 1,
  appType: 'mini-program',
  viewConfig,
  backendRouterPageKeyBlackList: ['refreshPage/', 'goBack/', 'goPrevious/'],
  backendRouterPageBlackList: ['NetworkException', 'EditProfileForm', 'Login', 'Me', 'UserDetail'],
  api: {
    FooterHome: 'viewHomepage/',
    FooterMe: 'customerViewDashboard/',
    Login: 'clientLogin/',
    VerifyCode: 'sendVerifyCode/:mobile/',
    OSSToken: 'customGetOssToken/',
  },
}

const Config = {
  ...niceRouterConfig,
  name: 'NiceRouter App Start',
  goBackSkipScreen: [],
  // loginMethod:'wechat', //
  // loginMethod:'vcode', //
  loginMethod: 'password', //
}

console.log('***********   current env  ***********   ')
console.log('config.js is', Config)
export default Config
