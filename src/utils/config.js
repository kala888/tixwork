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
    GenericPageMock: 'mock/',

    FooterHome: 'viewHomepage/',
    FooterMe: 'customerViewDashboard/',
    Login: 'clientLogin/',
    VerifyCode: 'sendVerifyCode/:mobile/',
  },
}

const Config = {
  ...niceRouterConfig,
  name: 'NiceRouter App Start',
  oss: {
    ossBucket: 'doublechain-public',
    staticUrl: 'https://doublechaintech-public.oss-cn-beijing.aliyuncs.com/',
    endPoint: 'oss-cn-beijing.aliyuncs.com',
  },
  goBackSkipScreen: [],
  useWxLogin: true,
}

console.log('***********   current env  ***********   ')
console.log('config.js is', Config)
export default Config
