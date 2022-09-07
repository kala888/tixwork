import Taro, { Current } from '@tarojs/taro';
import _ from 'lodash';
import { isEmpty, isNotEmpty } from '@/utils/object-utils';
import ActionUtil from '@/utils/action-util';
import { isH5 } from '@/utils';
import { H5PageProps } from '@/pages/h5/h5-page';
import NiceRouterUtils from './nice-router-utils';
import { getDispatcher } from '@/model/model-provider';
import { NavigationOptionType, PageHistoryType, RouteFunction } from './nice-router-types';
import LoadingType from '@/nice-router/loading-type';

class NavigationServiceClass {
  pageHistory: Record<string, PageHistoryType>; // 记得清空这个玩意，小心内存泄露
  /**
   * redux dispatch
   * @param actionType redux action name
   * @param params the parameters key-value map
   */
  async dispatch(actionType: string, params?: Record<string, any>): Promise<any> {
    const dispatcher = getDispatcher();
    const [namespace, action] = _.split(actionType, '/');
    const state: any = _.get(dispatcher.data, namespace);
    const fc = _.get(state, action);
    if (typeof fc === 'function') {
      return fc(params);
    }
    console.error(`没有找到${actionType}对应的方法请检查模型${namespace}中是否存在方法${action}，并且该方法可被调用`);
  }

  /**
   *
   *回退信息，
   *
   * @param data 后退时候，回传的数据对象
   * @param delta 后退步数，默认为1
   */
  async back(data: Record<string, any> = {}, delta: number = 1) {
    if (Taro.getCurrentPages().length === 1) {
      console.log('页面栈只剩一个了，不能后退');
      return;
    }
    const key: string = Current?.router?.path || '';
    await Taro.navigateBack({ delta });
    const { callback } = this.pageHistory[key] || {};
    if (callback) {
      callback(data);
      _.omit(this.pageHistory, key);
    }
  }

  /**
   * 本地页面跳转
   */
  goPage(routeName: string, params: Record<string, any> = {}, options?: NavigationOptionType): Promise<any> {
    return new Promise((resolve, reject) => {
      if (isEmpty(routeName)) {
        resolve && resolve(null);
        return;
      }
      const url = NiceRouterUtils.toTaroUrl(routeName, params);
      const { pagePath } = NiceRouterUtils.parseUri(url);
      const navigationMethod = NiceRouterUtils.getNavigationMethod(options?.navigationMethod, pagePath);
      navigationMethod({ url })
        .then(() => {
          // 把resolve存起来，主动调用 back的时候再调用
          const resolveShouldCallWhenPageGoBack = _.get(options, 'delayCallBack', false);
          if (!resolveShouldCallWhenPageGoBack) {
            resolve && resolve(null);
            return;
          }
          //call back delay
          this.pageHistory[pagePath] = {
            pagePath,
            callback: resolve,
          };
        })
        .catch((err) => {
          const { errMsg = '' } = err;
          if (errMsg.indexOf('a tabbar page')) {
            Taro.switchTab({ url }).then(() => {
              this.pageHistory = {};
              if (resolve) {
                resolve(null);
              }
            });
            return;
          }
          console.log(`Taro navigation get failed`, err);
          reject(err);
        });
    });
  }

  view: RouteFunction = async (action, params, options) => {
    return this.send(action, params, options);
  };

  ajax: RouteFunction = async (action, params, options = {}) => {
    return this.send(action, params, {
      loading: LoadingType.None,
      statInPage: true,
      ...options,
    });
  };
  post: RouteFunction = async (action, params, options = {}) => {
    return this.send(action, params, { ...options, method: 'post' });
  };

  send: RouteFunction = async (theAction, theParams = {}, theOptions = {}) => {
    const action = ActionUtil.trans2Action({
      action: theAction,
      params: theParams,
      ...theOptions,
    });
    const { linkToUrl = '', params, statInPage } = action;
    if (isEmpty(linkToUrl)) {
      console.log('THE ACTION linkToUrl IS EMPTY');
      return;
    }

    // action上带有属性，confirmContent, 触发先confirm再执行相关动作
    const confirmContent = ActionUtil.getConfirmContent(action);
    if (isNotEmpty(confirmContent)) {
      const confirmResp = await Taro.showModal({
        title: action.title,
        content: confirmContent,
      });
      if (!confirmResp.confirm) {
        return;
      }
    }

    // 1, 前端页面跳转, page:///pages/home/home-page?type=qa 或跳转到HomePage的screen
    if (!statInPage && NiceRouterUtils.isLocalPage(linkToUrl)) {
      const { params: queryParams, pagePath } = NiceRouterUtils.parseUri(linkToUrl);
      return this.goPage(pagePath, { ...params, ...queryParams });
    }

    // 2, H5跳转：目标页面是Http页面，小程序中需要跳转到webview
    if (!statInPage && NiceRouterUtils.isH5Page(linkToUrl)) {
      let h5PageTarget = linkToUrl;
      const h5Param: H5PageProps = {} as H5PageProps;
      if (isH5()) {
        console.warn(
          '兼容在H5中使用了带schema的linkToUrl，不推荐，H5代码应该只关心自己，不应该带Schema, 除非是不同业务域名的跳转'
        );
        // @ts-ignore
        window.location = linkToUrl;
        return;
      }
      h5PageTarget = '/pages/h5/h5-page';
      h5Param.uri = linkToUrl;
      return this.goPage(h5PageTarget, h5Param);
    }

    // 发送请求
    return this.dispatch('niceRouter/route', action);
  };
}

const NavigationService = new NavigationServiceClass();

export default NavigationService;
