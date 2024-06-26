import _ from 'lodash'
import ActionUtil from '@/nice-router/action-util'

import GlobalToast, { GlobalToastProps } from './global-toast'
import LocalCache from './local-cache.service'
import NavigationService, { currentScreenRef, NavigationMethodType } from './navigation-service'
import { createAction, isEmpty, isNotEmpty, LoadingType, noop } from './nice-router-util'
import { PopupMessageProps } from './popup-message'
import BackendService from './request/backend-service'
import ViewmappingService, { ViewConfigItemType } from './viewmapping-service'
import { StoreDataPayload } from '@/models/model-tools'
import { playSound } from '@/utils'
import GlobalPopup from '@/nice-router/global-popup'


export type RouterPayload = {
  method?: 'put' | 'post' | 'get';
  statInPage?: boolean; //前台标记为ajax, 页面不动
  params?: Record<string, any>; //请求参数
  asForm?: boolean; // post 数据时候把json转换为字符串 formData="{...}" 形式提交给后台
  onSuccess?: (resp: any, data: any) => void;
  onFailed?: () => void;
  loading?: LoadingType;
  navigationMethod?: NavigationMethodType;
  arrayMerge?: 'replace' | 'append';
  dataRefresh?: boolean; // 如果想页面刷：发送的是ajax，但是数据不错merge

  cache?: number;
  // headers = {}, // 请求header
};

function log(...params) {
  console.log(
    '%c nice-router: ',
    'color:#8add4c; text-shadow: 0.5px 0.5px 0.5px grey',
    ...params,
  )
}

function showToastOrPopup({ toast, popup }: { toast: GlobalToastProps; popup: PopupMessageProps }): void {
  // 后端说Toast
  if (isNotEmpty(toast)) {
    GlobalToast.show(toast)
  }
  // 后端说Popup
  if (isNotEmpty(popup)) {
    GlobalPopup.show(popup)
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
      log('save latest route', payload)
      return { ...state, latestRoute: payload }
    },
  },

  effects: {
    // 重发重试
    * retry({ payload }, { put, select }) {
      console.log('retry payload', payload)
      const { latestRoute } = yield select((state) => state.niceRouter)
      log('retry to next', latestRoute)
      if (latestRoute) {
        yield put(createAction('route')(latestRoute))
      }
    },

    // 主路由逻辑
    * route({ payload }: { payload: RouterPayload }, { call, put }) {
      log('niceRouter/router Router Payload', payload)
      const {
        statInPage = false,
        params = {},
        asForm,
        arrayMerge = 'replace',
        onSuccess = noop,
        loading,
        navigationMethod,
        dataRefresh,
        onFailed = noop,
      } = payload

      const linkToUrl = ActionUtil.getActionUri(payload)

      if (isEmpty(linkToUrl)) {
        console.warn('store.modules.router.route","can not send empty url to backend')
        return
      }

      const withLoading =
        loading || (asForm ? LoadingType.Modal : LoadingType.None)

      console.log('withLoading', withLoading)

      if (asForm) {
        const cached = yield LocalCache.isCachedForm(linkToUrl, params)
        if (cached) {
          GlobalToast.show({
            text: '操作太快了，换句话试试',
            duration: 2000,
          })
          return
        }
      }

      yield put(createAction('saveLatestRoute')(payload))
      const requestParams = { ...payload, uri: linkToUrl, loading: withLoading }
      const resp = yield call(BackendService.send, requestParams)
      const { success, xClass, xNavigationMethod, data } = resp

      if (success) {
        // onSuccess回调
        onSuccess(data, resp)
      } else {
        onFailed()
      }


      //获取ViewMapping 处理预支的state和effect，以及页面跳转
      if (xClass) {
        // onSuccess回调
        const { modelActions, pagePath, pageChanged } = getViewMapping(xClass, dataRefresh || statInPage)

        const storeData: StoreDataPayload = {
          navigationOption: {
            statInPage,
            arrayMerge,
            dataRefresh,
          },
          ...data,
        }

        for (let i = 0; i < modelActions.length; i++) {
          const modelAction = modelActions[i]
          if (isNotEmpty(modelAction)) {
            yield put(createAction(modelAction)(storeData))
          }
        }

        if (data.playSound) {
          playSound(data.playSound)
        }

        const msgFunc = () => showToastOrPopup({ toast: data.toast, popup: data.popup })

        //页面跳转逻辑处理
        // 1.后台指定xNavigationMethod
        // 2.前台指定navigationMethod
        // 3.默认都未指定时候，计算得出的pageChanged
        if (xNavigationMethod || navigationMethod || pageChanged) {
          NavigationService.navigate(pagePath,
            {},
            { navigationMethod: xNavigationMethod || navigationMethod },
          )
          // .then(msgFunc) TODO
          msgFunc()
        } else {
          msgFunc()
        }

        if (!asForm) {
          // noinspection JSIgnoredPromiseFromCall
          LocalCache.saveBackendRouter(linkToUrl, pagePath)
        }
        if (success && asForm) {
          // noinspection JSIgnoredPromiseFromCall
          LocalCache.cacheForm(linkToUrl, params)
        }

      }
    },
  },
}

function getCurrentPage() {
  return currentScreenRef.current
}


function getViewMapping(
  xClass: string,
  ajax?: boolean,
): {
  pageChanged: boolean;
  pagePath: string;
  modelActions: string[];
} {
  const nextView: ViewConfigItemType = ViewmappingService.getView(xClass, ajax)
  const nextPage = _.get(nextView, 'pageName', '')
  const modelActions = _.concat([], nextView.stateAction) as string[]
  let pageChanged = false
  const currentPage = getCurrentPage()
  log('current page is', currentPage, ', next page is', nextView)
  //存在下一个页面并且不是ajax，判断页面是否是同一页面，如果相同，如果不相同，则需要跳转
  if (nextPage && !ajax) {
    // @ts-ignore
    if (_.trim(nextPage, '/') !== _.trim(currentPage, '/')) {
      pageChanged = true
    }
  }
  return {
    pagePath: nextPage,
    modelActions,
    pageChanged,
  }
}
