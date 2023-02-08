import _ from 'lodash';
import classNames from 'classnames';
import { isEmpty, isNotEmpty } from '@/utils/object-utils';
import GlobalToast, { GlobalToastProps } from '@/components/global-popup/global-toast';
import GlobalPopup, { PopupMessageProps } from '@/components/global-popup/index';
import Taro, { Current } from '@tarojs/taro';
import { isH5 } from '@/utils';
import ViewMappingService, { ViewConfigItemType } from '@/nice-router/viewmapping-service';
import { NavigationMethodType, StoreDataPayload } from '@/nice-router/nice-router-types';
import StorageTools from '@/utils/storage-tools';

const NICE_ROUTER_LOCAL_PROTOCOL = 'page://';

const NavigationMethodMap = {
  push: 'navigateTo',
  replace: 'redirectTo',
  back: 'navigateBack',
  switchType: 'switchTab',
  reLaunch: 'reLaunch',
};

// 查看 Form是否被提交成功
const isCachedForm = async (url: string, params: Record<string, any> = {}) => {
  if (isEmpty(params)) {
    return false;
  }
  const content = JSON.stringify(params);
  const key = `${url}_${content}`;
  return !StorageTools.isExpired(key);
};
// form 提交内容 缓存 2 秒
const cacheForm = async (url: string, params: Record<string, any> = {}) => {
  if (isNotEmpty(params)) {
    const content = JSON.stringify(params);
    const key = `${url}_${content}`;
    StorageTools.set(key, params, 2);
  }
};

/**
 * 将页面和参数转化Taro的本地页面跳转URI
 *
 * @param uri 可能带有协议和？参数
 * @param params
 *
 * @return 带有？参数
 */
function toTaroUrl(uri: string, params: Record<string, any>): string {
  const url = trimUri(uri);
  if (isEmpty(url)) {
    return '';
  }
  const postFix = _.keys(params)
    .map((key) => key + '=' + params[key])
    .join('&');
  const connectChart = uri.includes('?') ? '&' : '?';
  return url + connectChart + postFix;
}

const isFooterTabPage = _.memoize((pagePath = '') => {
  if (isEmpty(pagePath)) {
    return false;
  }
  // @ts-ignore
  const taroAppConfig: Taro.AppConfig = window?.__taroAppConfig;
  const list = taroAppConfig?.tabBar?.list || [];
  return list.some((it) => pagePath?.startsWith(it.pagePath));
});

/**
 * 转换 method 到Taro的方法
 * @param method Taro.XXX方法，默认是navigateTo
 *  @param pagePath 页面名称，config中配置的
 */
const getNavigationMethod = (method: NavigationMethodType = 'push', pagePath?: string): Function => {
  if (isFooterTabPage(pagePath)) {
    return Taro.switchTab;
  }
  const theName = _.get(NavigationMethodMap, method, 'navigateTo');
  let theFunction = Taro[theName] || Taro.navigateTo;
  if (theFunction === Taro.navigateTo && Taro.getCurrentPages().length === 10) {
    // 10层
    console.warn('currentPages method is navigateTo，but the page stack is full, change it to redirect');
    return Taro.redirectTo;
  }
  return theFunction;
};

//判断是否是本地页面跳转协议，例如 page:///pages/biz/listof-test-page
const isLocalPage = (uri = '') => uri.trim().startsWith(NICE_ROUTER_LOCAL_PROTOCOL);
//移除首尾空格和自定义协议page://
const trimUri = _.memoize((uri = '') => _.replace(_.trim(uri), NICE_ROUTER_LOCAL_PROTOCOL, ''));
const isH5Page = _.memoize((uri = '') => uri.trim().toLowerCase().startsWith('http'));

/**
 * 将uri转换为taro页面和参数
 * @param uri string
 * @return pathname: page在config中的名字，以/开头
 *         params: 参数map
 */
const parseUri = (uri: string): { pagePath: string; params: Record<string, string> } => {
  const url = trimUri(uri);
  const urlData = url.split('?');
  let params = {};
  if (isNotEmpty(urlData)) {
    const strAry = _.split(urlData[1], '&').map((i) => i.split('='));
    params = _.fromPairs(strAry);
  }
  const page = urlData[0];
  const pagePath = !page.startsWith('/') ? `/${page}` : page;
  return { pagePath, params };
};

function getCurrentPage() {
  const pages = Taro.getCurrentPages();
  const currentPage = _.last(pages) || { route: '' };
  //TODO
  return isH5() ? Current.router?.path : '/' + currentPage.route;
}

function getViewMapping(
  xClass: string,
  ajax?: boolean
): {
  pageChanged: boolean;
  pagePath: string;
  modelActions: string[];
} {
  const nextView: ViewConfigItemType = ViewMappingService.getView(xClass, ajax);
  const nextPage = _.get(nextView, 'pageName', '');
  const modelActions = _.concat([], nextView.stateAction) as string[];
  let pageChanged = false;
  const currentPage = getCurrentPage();
  console.log('current page is', currentPage, ', next page is', nextView);
  //存在下一个页面并且不是ajax，判断页面是否是同一页面，如果相同，如果不相同，则需要跳转
  if (nextPage && !ajax) {
    if (_.trim(nextPage, '/') !== _.trim(currentPage, '/')) {
      pageChanged = true;
    }
  }
  return {
    pagePath: nextPage,
    modelActions,
    pageChanged,
  };
}

function showToastOrPopup({ toast, popup }: { toast: GlobalToastProps; popup: PopupMessageProps }): void {
  // 后端说Toast
  if (isNotEmpty(toast)) {
    GlobalToast.show({ ...toast, icon: 'none' });
  }
  // 后端说Popup
  if (isNotEmpty(popup)) {
    GlobalPopup.show(popup);
  }
}

/**
 *
 * mode
 *
 * @returns {{mode: (function(*=): (*)), classNames: (function(*=, ...[*]=): string)}}
 */
export function getExtMode(...props: any[]) {
  const modeList = _.flatten(props).filter(isNotEmpty);

  const buildWithPrefix = (prefix) => {
    if (isEmpty(prefix)) {
      return prefix;
    }
    const list = modeList.map((it) => {
      if (_.isObject(it)) {
        return _.keys(it).map((key) => (it[key] ? key : ''));
      }
      return it;
    });
    return _.flatten(list)
      .filter((it) => isNotEmpty(it))
      .map((it) => `${prefix}--${_.trim(it)}`);
  };

  return {
    mode: buildWithPrefix,
    classNames: function (prefix: any, ...others: any[]) {
      return classNames(prefix, others, buildWithPrefix(prefix));
    },
  };
}

const _replaceArray = (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return srcValue;
  }
};

const _concatArray = (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
};

const mergeState = (
  preState: StoreDataPayload = {} as StoreDataPayload,
  newState: StoreDataPayload = {} as StoreDataPayload,
  doMerge = false,
  arrayMerge = 'append'
) => {
  const { viewHashString: preHash } = preState;
  const { viewHashString: newHash } = newState;

  // 数据没有变化
  if (isNotEmpty(newHash) && preHash === newHash) {
    return null;
  }

  // 不进行merge操作
  if (!doMerge) {
    return newState;
  }

  // merge 对象, 不指定array的merge方法，默认为concat data to legacy array
  const processor = arrayMerge === 'replace' ? _replaceArray : _concatArray;
  // 小程序下没问题，但是H5中，redux做的浅比较，ajax会有问题
  // const result = mergeWith(preState, newState, processor)
  const result = _.mergeWith({}, preState, newState, processor);
  console.log('merged result', result);

  return result;
};

const NiceRouterUtils = {
  isCachedForm,
  cacheForm,
  toTaroUrl,
  isFooterTabPage,
  getNavigationMethod,
  isLocalPage,
  trimUri,
  isH5Page,
  parseUri,
  getCurrentPage,
  getViewMapping,
  showToastOrPopup,
  getExtMode,
  mergeState,
};
export default NiceRouterUtils;
