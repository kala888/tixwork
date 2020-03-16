import Taro from '@tarojs/taro'
import parse from 'url-parse'
import qs from 'qs'
import isObject from 'lodash/isObject'
import isEmpty from 'lodash/isEmpty'
import startsWith from 'lodash/startsWith'
import localCacheService from './local-cache.service'
import { LoadingType, toTaroUrl, log } from './nice-router-util'

const PAGE_LEVEL_LIMIT = 10

let _container = {} // eslint-disable-line

const isH5Path = (uri) => startsWith(uri, 'https://') || startsWith(uri, 'http://')

const getActionUri = (action) => {
  let result = action
  if (isObject(action)) {
    const { linkToUrl, uri } = action
    result = linkToUrl || uri
  }
  return result || ''
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

  isActionLike(action) {
    return !isEmpty(getActionUri(action))
  },

  dispatch(action, params) {
    const { dispatch, props = {} } = _container || {}
    const dispatchFunc = dispatch || props.dispatch
    if (dispatchFunc) {
      dispatchFunc({
        type: action,
        payload: params,
      })
    }
  },

  reset(routeName, params) {
    Taro.navigateBack(20)
    this.navigate(routeName, params)
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
    const { path: key } = _page.$router || {}

    return new Promise((resolve, reject) => {
      Taro.navigateBack({ delta })
        .then(() => {
          const pageResolve = this.pagesResolves[key]
          pageResolve && pageResolve(data)
          this.pagesResolves[key] = null
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
      const pages = Taro.getCurrentPages()
      const url = toTaroUrl(routeName, params)
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
              this.pagesResolves[routeName] = resolve
            })
            .catch((err) => {
              const { errMsg = '' } = err
              if (errMsg.indexOf('a tabbar page')) {
                // Taro.switchTab({ url }).then(clearPagesResolves)
                Taro.switchTab({ url }).then(() => this.clearPagesResolves())
                return
              }
              log(`Taro.${method} run failed`, err)
              reject(err)
            })
        }
      }
    })
  },

  view(uri, params = {}, options = {}) {
    this.routeTo({ uri, params, ...options })
  },

  ajax(uri, params, options = {}) {
    this.routeTo({ uri, loading: LoadingType.none, params, ...options, statInPage: true })
  },

  post(uri, params, options = {}) {
    this.routeTo({ uri, params, ...options, method: 'post' })
  },

  put(uri, params, options = {}) {
    this.routeTo({ uri, params, ...options, method: 'put' })
  },

  async routeTo(action) {
    const { uri: actionUri = '', cache = false, params } = action

    const uri = getActionUri(actionUri)
    if (uri.length === 0) {
      return
    }

    // 1, 前端页面跳转, page:ArticleForm?type=qa 或跳转到Article的screen
    const urlData = parse(uri)
    const { protocol } = urlData
    if (protocol === 'page:') {
      const { query, pathname } = urlData
      const queryParams = qs.parse(query)
      const pageName = pathname
      // const pageName = trim(pathname, '/')
      log('.......', protocol, pathname, pageName)
      this.navigate(pageName, { ...params, ...queryParams })
      return
    }

    // 2, H5 页面跳转
    if (isH5Path(uri)) {
      this.navigate('/nice-router/h5-page', { uri })
      return
    }

    // 3, 后端路由, 获取后端路由缓存
    const cachedPage = await localCacheService.getCachedPage(uri)
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
    this.dispatch('niceRouter/route', {
      ...action,
      uri,
    })
  },
}

export default NavigationService
