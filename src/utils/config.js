import viewConfig from './viewmapping.config'

const baseURL = 'https://demo2.doublechaintech.com/repairchain/wxappService/' //后端服务地址

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
    Logout: 'logout/',
  },
  // loginMode: 'wechat',
  loginMode: 'vcode', //包含绑定的微信登录
  // loginMode: 'password',
}

console.log('***********   current env  ***********   ')
console.log('config.js is', Config)
export default Config
