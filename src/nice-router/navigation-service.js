import { isH5 } from '@/utils/index'
import _ from 'lodash'
import Taro, { Current } from '@tarojs/taro'
import ActionUtil from './action-util'

import localCacheService from './local-cache-service'
import {
  isEmpty,
  isLocalPagePath,
  isNotEmpty,
  LoadingType,
  log,
  noop,
  parseTaroUri,
  toTaroUrl,
} from './nice-router-util'

const PAGE_LEVEL_LIMIT = 10

let _container = {} // eslint-disable-line

const isH5Path = (uri = '') => {
  const str = uri.trim().toLowerCase()
  return str.startsWith('https://') || str.startsWith('http://')
}

const _getNavigationMethod = (method) => {
  const pages = Taro.getCurrentPages()
  if (
    (method === 'navigateTo' && pages.length >= PAGE_LEVEL_LIMIT - 3) ||
    (method === 'navigateToByForce' && pages.length === PAGE_LEVEL_LIMIT)
  ) {
    return Taro.redirectTo
  }

  return Taro[method]
}

const NavigationService = {
  pagesGoBackCallback: {}, // 记得清空这个玩意，小心内存泄露
  clearPagesGoBackCallback() {
    NavigationService.pagesGoBackCallback = {}
    this.pagesGoBackCallback = {}
  },

  setContainer(container) {
    if (!container) {
      return
    }
    _container = container
  },

  dispatch(action, params) {
    const { dispatch, props = {} } = _container || {}
    const func = dispatch || props.dispatch || noop
    func({
      type: action,
      payload: params,
    })
  },

  async reset(routeName, params) {
    await Taro.navigateBack({
      delta: 20,
    })
    await this.navigate(routeName, params)
  },

  /**
   *
   * @param delta
   * @param data
   * @param _page
   * @returns {Promise<any>}
   *
   * eg. 后退传参 NavigationService.back({data},this)
   */
  back(data = {}, delta = 1) {
    const { path: key } = Current.router
    return new Promise((resolve, reject) => {
      Taro.navigateBack({ delta })
        .then(() => {
          const goBackCallback = this.pagesGoBackCallback[key]
          if (goBackCallback) {
            goBackCallback(data)
            this.pagesGoBackCallback[key] = null
          }
          resolve()
        })
        .catch((err) => reject(err))
    })
  },

  /**
   *
   * @param routeName
   * @param params
   * @param options
   * @returns {Promise<any>}
   */
  navigate(routeName, params, options = {}) {
    return new Promise((resolve, reject) => {
      const url = toTaroUrl(routeName, params)
      // console.log('taro-redirect', url)
      if (routeName) {
        const method = _.get(options, 'navigationOptions.method', 'navigateTo')
        const resolveIsGoBackCallback = _.get(options, 'resolveIsGoBackCallback', false)
        const routeMethod = _getNavigationMethod(method)
        if (routeMethod) {
          routeMethod({ url })
            .then(() => {
              // 把resolve存起来，主动调用 back的时候再调用
              if (resolveIsGoBackCallback) {
                this.pagesGoBackCallback[routeName] = resolve
              } else {
                resolve && resolve()
              }
            })
            .catch((err) => {
              const { errMsg = '' } = err
              if (errMsg.indexOf('a tabbar page')) {
                Taro.switchTab({ url }).then(() => {
                  this.clearPagesGoBackCallback()
                  if (resolve) {
                    resolve()
                  }
                })
                return
              }
              log(`Taro navigation get failed`, err)
              reject(err)
            })
        }
      }
    })
  },

  view(action, params = {}, options = {}) {
    return this.routeTo({ action, params, ...options })
  },

  ajax(action, params, options = {}) {
    return this.routeTo({
      action,
      params,
      loading: LoadingType.none,
      ...options,
      statInPage: true,
    })
  },

  refresh(action, params, options = {}) {
    return this.ajax(action, params, { ...options, refresh: true })
  },

  post(action, params, options = {}) {
    return this.routeTo({
      action,
      params,
      ...options,
      method: 'post',
    })
  },

  put(action, params, options = {}) {
    return this.routeTo({
      action,
      params,
      ...options,
      method: 'put',
    })
  },

  async routeTo(routerParams) {
    const action = ActionUtil.trans2Action(routerParams)
    const { linkToUrl, cache = false, params, statInPage } = action
    if (isEmpty(linkToUrl)) {
      console.log('THE ACTION linkToUrl IS EMPTY')
      return
    }

    // action上带有属性，confirmContent, 触发先confirm再执行相关动作
    const confirmContent = ActionUtil.getConfirmContent(action)
    if (isNotEmpty(confirmContent)) {
      const confirmResp = await Taro.showModal({
        title: action.title,
        content: confirmContent,
      })
      if (!confirmResp.confirm) {
        return
      }
    }

    // 1, 前端页面跳转, page:///pages/home/home-page?type=qa 或跳转到HomePage的screen
    if (!statInPage && isLocalPagePath(linkToUrl)) {
      const { queryParams, pathname } = parseTaroUri(linkToUrl)
      return this.navigate(pathname, { ...params, ...queryParams })
    }

    // 2, H5跳转：目标页面是Http页面，小程序中需要跳转到webview
    if (!statInPage && isH5Path(linkToUrl)) {
      let h5PageTarget = linkToUrl
      const h5Param = {}
      if (!isH5()) {
        h5PageTarget = '/nice-router/h5-page'
        h5Param.uri = linkToUrl
      }
      return this.navigate(h5PageTarget, h5Param)
    }

    // 3, 后端路由, 获取后端路由缓存
    const cachedPage = localCacheService.getCachedPage(linkToUrl)
    log('go to cached page first', cachedPage)
    // 如果缓存存在，做页面跳转
    if (cachedPage) {
      // this.navigate(cachedPage)
      // TODO
      log('need CACHE the DATA', cache)
      // if (cache) {
      //   return
      // }
    }

    // 发送请求
    this.dispatch('niceRouter/route', action)
  },
}

export default NavigationService
