import viewConfig from './viewmapping.config'

const baseURL = 'https://demo.doublechaintech.com/dmos/' //后端服务地址

const niceRouterConfig = {
  name: '公证电子档案云链',
  baseURL,
  version: 1,
  appType: 'mini-program',
  viewConfig,
  backendRouterPageKeyBlackList: ['refreshPage/', 'goBack/', 'goPrevious/'],
  backendRouterPageBlackList: ['NetworkException', 'EditProfileForm', 'Login', 'Me', 'UserDetail'],
  api: {
    GenericPageMock: 'mock/',

    FooterHome: 'viewHomePage/',
    FooterMe: 'customerViewDashboard/',
    Login: 'clientLogin/',
    VerifyCode: 'sendVerifyCode/:mobile/',
    OSSToken: 'customGetOssToken/',
    SearchHome: 'dataApplicationManager/view/DA000007/',
    Search:
      'dataApplicationManager/loadDataApplication/DA000007/candidateDataSetList.searchField.0=name;candidateDataSetList.searchVerb.0=contains;candidateDataSetList.searchValue.0=:pSearchValue;candidateDataSetList=1;candidateDataSetList.orderBy.0=id;candidateDataSetList.descOrAsc.0=desc/',
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
