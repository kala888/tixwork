import { isH5 } from '@/utils/index';
import Taro, { Current } from '@tarojs/taro';
import _ from 'lodash';

import GlobalToast, { GlobalToastProps } from './global-toast';
import LocalCache from './local-cache-service';
import NavigationService, { TaroNavigationMethod } from './navigation-service';
import { createAction, isEmpty, isNotEmpty, LoadingType, log, noop } from './nice-router-util';
import ActionUtil from './action-util';
import PopupMessage, { PopupMessageProps } from './popup-message';
import BackendService from './request/backend-service';
import ViewMappingService from './viewmapping-service';

export type RouterPayload = {
  method?: 'put' | 'post' | 'get';
  statInPage?: boolean; //前台标记为ajax, 页面不动
  params?: Record<string, any>; //请求参数
  asForm?: boolean; // post 数据时候把json转换为字符串 formData="{...}" 形式提交给后台
  arrayMerge?: 'replace' | 'append';
  onSuccess?: (resp: any, data: any) => void;
  loading?: LoadingType;
  navigationMethod?: TaroNavigationMethod;
  refresh?: boolean;
  effectAction?: string; //TODO ??
  stateAction?: string; //TODO ??
  cache?: number;
  // headers = {}, // 请求header
};

function showToastOrPopup({ toast, popup }: { toast: GlobalToastProps; popup: PopupMessageProps }): void {
  // 后端说Toast
  if (isNotEmpty(toast)) {
    GlobalToast.show({ ...toast, icon: 'none' });
  }
  // 后端说Popup
  if (isNotEmpty(popup)) {
    PopupMessage.show(popup);
  }
}

export default {
  namespace: 'niceRouter',
  state: {
    latestRoute: {},
    isShow: true,
  },
  reducers: {
    // 保存最近的路由请求信息
    saveLatestRoute(state, { payload }) {
      log('save latest route', payload);
      return { ...state, latestRoute: payload };
    },
  },

  effects: {
    // 重发重试
    *retry({ payload }, { put, select }) {
      console.log('retry payload', payload);
      const { latestRoute } = yield select((state) => state.niceRouter);
      log('retry to next', latestRoute);
      if (latestRoute) {
        yield put(createAction('route')(latestRoute));
      }
    },

    // 主路由逻辑
    *route({ payload }: { payload: RouterPayload }, { call, put }) {
      log('niceRouter/router Router Payload', payload);
      const {
        statInPage = false,
        params = {},
        asForm,
        arrayMerge = 'replace',
        onSuccess = noop,
        loading,
        navigationMethod,
        refresh,
      } = payload;

      const linkToUrl = ActionUtil.getActionUri(payload);

      if (isEmpty(linkToUrl)) {
        console.warn('store.modules.router.route","can not send empty url to backend');
        return;
      }

      const withLoading = loading || (asForm ? LoadingType.Modal : LoadingType.None);

      if (asForm) {
        const cached = yield LocalCache.isCachedForm(linkToUrl, params);
        if (cached) {
          GlobalToast.show({
            text: '操作太快了，换句话试试',
            duration: 2000,
          });
          return;
        }
      }

      yield put(createAction('saveLatestRoute')(payload));

      const requestParams = { ...payload, uri: linkToUrl, loading: withLoading };

      const resp = yield call(BackendService.send, requestParams);

      const { success, xclass, xredirect, data } = resp;

      // onSuccess回调
      onSuccess(data, { ...resp });

      //获取ViewMapping 处理预支的state和effect，以及页面跳转
      if (xclass) {
        const viewMappingParams = {
          xclass,
          xredirect,
          statInPage,
          effectAction: payload.effectAction,
          stateAction: payload.stateAction,
        };
        // onSuccess回调
        const viewMapping = getViewMapping(viewMappingParams);

        const { stateAction, effectAction, pageName, doRedirect } = viewMapping;

        const storeData = {
          ...data,
          statInPage,
          arrayMerge,
          refresh,
        };
        const modelActions = _.concat(stateAction, effectAction);
        for (let i = 0; i < modelActions.length; i++) {
          const modelAction = modelActions[i];
          if (isNotEmpty(modelAction)) {
            yield put(createAction(modelAction)(storeData));
          }
        }

        //页面跳转逻辑处理
        if (doRedirect) {
          NavigationService.navigate(pageName, {}, { navigationMethod }).then(() =>
            showToastOrPopup({ toast: data.toast, popup: data.popup })
          );
        } else {
          showToastOrPopup({ toast: data.toast, popup: data.popup });
        }

        if (!asForm) {
          // noinspection JSIgnoredPromiseFromCall
          LocalCache.saveBackendRouter(linkToUrl, pageName);
        }
        if (success && asForm) {
          // noinspection JSIgnoredPromiseFromCall
          LocalCache.cacheForm(linkToUrl, params);
        }
      }
    },
  },
};

function getCurrentPage() {
  const pages = Taro.getCurrentPages();
  const currentPage = _.last(pages) || { route: '' };
  //TODO
  return isH5() ? Current.router?.path : '/' + currentPage.route;
}

function getViewMapping({
  xclass,
  stateAction,
  effectAction,
  xredirect,
  statInPage,
}): {
  pageName: string;
  stateAction: string | string[];
  effectAction: string | string[];
  doRedirect: boolean;
} {
  const nextView = ViewMappingService.getView(xclass, statInPage);

  const nextPage = nextView.pageName || '';
  const newStateAction = stateAction || nextView.stateAction || [];
  const newEffectAction = effectAction || nextView.effectAction || [];

  let doRedirect = false;
  // if ((xredirect || (!xredirect && !statInPage))
  // && currentPage !== `pages${viewMapping}`) {
  // 1.如果没有设置class 和page 的映射，则不跳转
  // 2.否则，2.1 如果后台告诉我强制跳转，就跳转
  // 2.2 如果后台没告诉强制跳转，也没有设置statInPage，就跳转。既前台说是ajax，既后台默认容许了
  // const sameAsCurrentPage = LATEST_PAGE === url
  // console.log("latest page is", LATEST_PAGE, "current url is", url, "sameAsCurrentPage", sameAsCurrentPage)

  const currentPage = getCurrentPage();
  log('current page is', currentPage, ', next page is', nextView);
  if (nextPage && (xredirect || (!xredirect && !statInPage))) {
    if (_.trim(nextPage, '/') !== _.trim(currentPage, '/')) {
      doRedirect = true;
    }
  }

  return {
    pageName: nextPage,
    stateAction: newStateAction,
    effectAction: newEffectAction,
    doRedirect,
  };
}
