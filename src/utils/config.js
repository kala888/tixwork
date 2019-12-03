import viewConfig from './viewmapping.config'

const baseURL = 'https://demo2.doublechaintech.com/bcex/wxappService/' //后端服务地址

const niceRouterConfig = {
  name: '链问链答',
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
    UpdateUserInfo: 'customerUpdateProfile/:name/:avatar/:userType/',
    StartExam: 'customerStartExam/',
    AnswerQuestion: 'customerAnswerQuestion/:questionId/:choicesId/',
    ViewScore: 'customerViewScore/:id/',
    ViewFaultAnswer: 'customerViewFaultAnswer/',
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
