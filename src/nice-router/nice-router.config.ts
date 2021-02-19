import _ from 'lodash';
import NavigationService from './navigation-service';

export interface BaseAppConfiguration {
  name: string;
  baseURL: string;
  version: number;
  appType: string;
  api: any;
  viewConfig: object;
  backendRouterPageBlackList: string[];
  backendRouterPageKeyBlackList: string[];
  loginMode?: 'wechat' | 'vcode' | 'password';
}

type NiceRouterConfigProps = {
  config?: BaseAppConfiguration;
  status: 'initial' | 'done';
  start?: (props: { config: BaseAppConfiguration; container?: any }) => void;
};

const defaultViewConfig = {
  'com.terapico.appview.H5Page': {
    pageName: 'H5Page',
    stateAction: '/nice-router/h5-page',
  },
  'NetworkException.RetryPage': {
    pageName: '/nice-router/network-exception-page',
  },
};

const defaultConfig: BaseAppConfiguration = {
  name: 'nice-router',
  baseURL: '',
  version: 1,
  appType: 'nice-router-taro',
  api: {},
  viewConfig: defaultViewConfig,
  backendRouterPageBlackList: [],
  backendRouterPageKeyBlackList: [],
};

const NiceRouterConfig: NiceRouterConfigProps = { status: 'initial' };

NiceRouterConfig.start = ({ config = {}, container }): NiceRouterConfigProps => {
  NavigationService.setContainer(container);

  NiceRouterConfig.config = _.merge(defaultConfig, config);

  const tempViewConfig = {};
  const vcfg = NiceRouterConfig.config.viewConfig;
  Object.keys(vcfg).map((key) => {
    tempViewConfig[key.trim()] = vcfg[key];
  });
  NiceRouterConfig.config.viewConfig = tempViewConfig;

  NiceRouterConfig.status = 'done';

  return NiceRouterConfig;
};

export default NiceRouterConfig;
