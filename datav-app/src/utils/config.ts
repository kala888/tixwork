import {AppConfiguration} from '@/nice-router/nice-router.config'
import ViewMappingConfig from '@/utils/viewmapping.config'

const baseURL = 'http://xxx.com/' //测试地址

const h5Prefix = 'http://xxx.com/h5/pages' //H5页面

const ApiConfig = {
  FooterHome: 'wxappService/viewHomePage/',
  Login: 'wxappService/clientLogin/',
}

type CfgType = { h5Prefix: String } & Omit<AppConfiguration, 'start'>

const TheCustomizedProjectConfigurationDontUseItDirectly: CfgType = {
  name: '实验大屏',
  baseURL,
  h5Prefix,
  version: '1.5',
  appType: 'app',
  api: ApiConfig,
  backendRouterPageKeyBlackList: ['refreshPage/', 'goBack/', 'goPrevious/'],
  backendRouterPageBlackList: ['NetworkException'],
  viewConfig: ViewMappingConfig,
  // loginMode: 'wechat',
  loginMode: 'vcode', //包含绑定的微信登录
  // loginMode: 'password',
}


console.log('***********   current env  ***********   ')
console.log('config.js is', TheCustomizedProjectConfigurationDontUseItDirectly)

export {ApiConfig, TheCustomizedProjectConfigurationDontUseItDirectly}
