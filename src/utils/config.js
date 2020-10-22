import viewConfig from './viewmapping.config'

const baseURL = 'https://demo2.doublechaintech.com/storedev/wxappService/' //后端服务地址

const Config = {
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
    VerifyCode: 'sendVerifyCode/:mobile/',
    OSSToken: 'customGetOssToken/',
  },
  // loginMethod:'wechat',
  // loginMethod:'vcode',
  loginMethod: 'password',
}

console.log('***********   current env  ***********   ')
console.log('config.js is', Config)
export default Config
