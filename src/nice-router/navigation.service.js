import { isH5 } from '@/utils/index'
import Taro from '@tarojs/taro'
import ActionUtil from './action-util'

import localCacheService from './local-cache.service'
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

const NavigationService = {
  pagesResolves: {}, // 记得清空这个玩意，小心内存泄露
  clearPagesResolves() {
    NavigationService.pagesResolves = {}
    this.pagesResolves = {}
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
  back({ delta = 1, data } = {}, _page = {}) {
    console.log('should be a error here', delta, data, _page)
    //TODO
    // const { path: key } = _page.$router || {}

    // return new Promise((resolve, reject) => {
    //   Taro.navigateBack({ delta })
    //     .then(() => {
    //       const pageResolve = this.pagesResolves[key]
    //       pageResolve && pageResolve(data)
    //       this.pagesResolves[key] = null
    //       resolve()
    //     })
    //     .catch((err) => reject(err))
    // })
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
      const pages = Taro.getCurrentPages()
      const url = toTaroUrl(routeName, params)

      console.log('taro-redirect', url)

      if (routeName) {
        let { navigationOptions: { method = 'navigateTo' } = {} } = options
        if (
          (method === 'navigateTo' && pages.length >= PAGE_LEVEL_LIMIT - 3) ||
          (method === 'navigateToByForce' && pages.length === PAGE_LEVEL_LIMIT)
        ) {
          method = 'redirectTo'
        }
        // 把resolve存起来，主动调用 back的时候再调用
        log('resolve...resolve', this.pagesResolves[routeName])
        const routeMethod = Taro[method]
        if (routeMethod) {
          routeMethod({ url })
            .then(() => {
              // this.pagesResolves[routeName] = resolve
              if (resolve) {
                resolve()
              }
            })
            .catch((err) => {
              const { errMsg = '' } = err
              if (errMsg.indexOf('a tabbar page')) {
                // Taro.switchTab({ url }).then(clearPagesResolves)
                Taro.switchTab({ url }).then(() => {
                  // this.clearPagesResolves()
                  if (resolve) {
                    resolve()
                  }
                })
                return
              }
              log(`Taro.${method} run failed`, err)
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
    const { linkToUrl, cache = false, params } = action
    if (isEmpty(linkToUrl)) {
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
    if (isLocalPagePath(linkToUrl)) {
      const { queryParams, pathname } = parseTaroUri(linkToUrl)
      return this.navigate(pathname, { ...params, ...queryParams })
    }

    // 2, H5跳转：目标页面是Http页面，小程序中需要跳转到webview
    if (isH5Path(linkToUrl)) {
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
