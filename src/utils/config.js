import viewConfig from './viewmapping.config'

const baseURL = 'https://demo.doublechaintech.com/health/wxappService/' //后端服务地址

const niceRouterConfig = {
  name: '疾疫报',
  baseURL,
  version: 1,
  appType: 'mini-program',
  viewConfig,
  backendRouterPageKeyBlackList: ['refreshPage/', 'goBack/', 'goPrevious/'],
  backendRouterPageBlackList: ['NetworkException', 'EditProfileForm', 'Login', 'Me', 'UserDetail'],
  api: {
    GenericPageMock: 'mock/',

    NewOrg: 'mock/',
    NewQuestionnaire: 'mock/',
    QuestionList: 'mock/',

    UpdateUserInfo: 'customerUpdateProfile/:name/:avatar/:userType/',
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
  useWxLogin: true,
}

console.log('***********   current env  ***********   ')
console.log('config.js is', Config)
export default Config
