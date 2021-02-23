import NavigationService from '@/nice-router/navigation-service';
import _ from 'lodash';
import ViewMappingService from '@/nice-router/viewmapping-service';

export interface AppConfiguration {
  name: string;
  baseURL: string;
  version: number;
  appType: string;
  viewConfig: Record<string, any>;
  api: Record<string, string>;
  backendRouterPageBlackList: string[];
  backendRouterPageKeyBlackList: string[];
  loginMode?: 'wechat' | 'vcode' | 'password';
  start?: (config: AppConfiguration, container: any) => void;
  get?: (key: string) => any;
}

const defaultConfig: AppConfiguration = {
  name: 'nice-router',
  baseURL: '',
  version: 1,
  appType: 'nice-router-taro',
  viewConfig: {},
  api: {},
  backendRouterPageBlackList: [],
  backendRouterPageKeyBlackList: [],
  start: (config: AppConfiguration, container: any) => {
    NavigationService.setContainer(container);
    Config = _.merge(defaultConfig, config);
    ViewMappingService.setViewConfig(Config?.viewConfig);
  },
  get: (key) => _.get(this, key),
};

// eslint-disable-next-line import/no-mutable-exports
let Config: AppConfiguration = defaultConfig;

export default Config;
