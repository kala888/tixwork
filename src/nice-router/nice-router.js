import _ from 'lodash'

import NavigationService from './navigation.service'

const defaultViewConfig = {
  'com.terapico.moyi.appview.H5Page': {
    pageName: 'H5Page',
    stateAction: '/nice-router/h5-page',
  },
  'com.terapico.caf.local.NetworkException': {
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

const NiceRouter = {
  config: {},
  status: NiceRouterStatus.initial,
}

NiceRouter.start = ({ config = {}, container }) => {
  NavigationService.setContainer(container)

  NiceRouter.config = _.merge(defaultConfig, config)

  const processedViewConfig = {}
  _.forEach(NiceRouter.config.viewConfig, (value, key) => {
    processedViewConfig[_.trim(key)] = value
  })
  NiceRouter.config.viewConfig = processedViewConfig

  NiceRouter.status = NiceRouterStatus.done

  return NiceRouter
}

export default NiceRouter
