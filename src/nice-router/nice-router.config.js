import _ from 'lodash'
import NavigationService from './navigation-service'

const defaultViewConfig = {
  'com.terapico.appview.H5Page': {
    pageName: 'H5Page',
    stateAction: '/nice-router/h5-page',
  },
  'NetworkException.RetryPage': {
    pageName: '/nice-router/network-exception-page',
  },
}

const defaultConfig = {
  baseURL: '',
  version: 1,
  appType: 'nice-router-taro',
  api: {},
  viewConfig: defaultViewConfig,
  backendRouterPageBlackList: [],
  backendRouterPageKeyBlackList: [],
}

const NiceRouterStatus = {
  initial: 0,
  done: 1,
}

const NiceRouterConfig = {
  config: {},
  status: NiceRouterStatus.initial,
}

NiceRouterConfig.start = ({ config = {}, container }) => {
  NavigationService.setContainer(container)

  NiceRouterConfig.config = _.merge(defaultConfig, config)

  const tempViewConfig = {}
  const vcfg = NiceRouterConfig.config.viewConfig
  Object.keys(vcfg).map((key) => {
    tempViewConfig[key.trim()] = vcfg[key]
  })
  NiceRouterConfig.config.viewConfig = tempViewConfig

  NiceRouterConfig.status = NiceRouterStatus.done

  return NiceRouterConfig
}

export default NiceRouterConfig
