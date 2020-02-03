/* eslint-disable no-underscore-dangle,import/no-extraneous-dependencies */
import Taro from '@tarojs/taro'
import keys from 'lodash/keys'
import isObjectLike from 'lodash/isObjectLike'
import cloneDeep from 'lodash/cloneDeep'
import pathToRegexp from 'path-to-regexp'
import AuthTools from './auth-tools'
import { LoadingType } from './nice-router-util'
import ViewMappingService from './viewmapping.service'
import OverlayLoading from './overlay-loading'
import NiceRouter from './nice-router'
import GlobalToast from './global-toast'

const systemErrorXClass = 'com.terapico.caf.local.NetworkException'

async function showLoading(loading) {
  console.log('loading....', loading)
  if (loading === LoadingType.modal) {
    OverlayLoading.showLoadingModal()
  }

  if (loading === LoadingType.barLoading) {
    Taro.showNavigationBarLoading()
  }
}

async function hideLoading(loading) {
  if (loading === LoadingType.modal) {
    OverlayLoading.hideLoadingModal()
  }

  if (loading === LoadingType.barLoading) {
    Taro.hideNavigationBarLoading()
  }
}

function toast(text) {
  GlobalToast.show({ text, duration: 5000 })
}

function showError({ xclass, data = {} }) {
  console.log('request got error', data)
  const { localizedMessage, messageList, message } = data

  if (xclass === systemErrorXClass) {
    return
  }

  const { message: localMessage } = ViewMappingService.getView(xclass)
  if (localMessage) {
    return
  }

  if (localizedMessage) {
    toast(localizedMessage)
    return
  }

  if (messageList) {
    const error = messageList.map((msg) => msg.body).join('\n')
    toast(error)
    return
  }

  if (message) {
    toast(message)
    return
  }

  if (!localMessage && process.env.NODE_ENV === 'development') {
    toast(`开发调试错误信息:${JSON.stringify(data)}`)
  }
}

const HttpRequest = {
  showDebugFlag: false,

  isFailedResult({ xclass, data }) {
    if (!isObjectLike(data)) {
      return false
    }
    return xclass ? xclass.endsWith('Exception') : false
  },
  fetch(options) {
    const { method = 'get', params, ...others } = options
    let { uri } = options
    const cloneData = cloneDeep(params)

    let domain = ''
    if (uri.match(/[a-zA-z]+:\/\/[^/]*/)) {
      ;[domain] = uri.match(/[a-zA-z]+:\/\/[^/]*/)
      uri = uri.slice(domain.length)
    }
    const match = pathToRegexp.parse(uri)
    // const toPath = pathToRegexp.compile(uri, { encode: encodeURIComponent })
    const toPath = pathToRegexp.compile(uri)

    try {
      uri = toPath(params)
    } catch (e) {
      console.warn('解析uri错误, 多半是带":"的替代变量为空了，请尽量避免在url中使用":"', e)
    }

    match.forEach((item) => {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    })

    const url = NiceRouter.config.baseURL + domain + uri
    const header = {
      ...others.headers,
    }
    if (method.toLocaleLowerCase() === 'post') {
      header['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    return Taro.request({
      url,
      method: method.toLocaleLowerCase(),
      header,
      data: cloneData,
    })
  },
  logResp(response) {
    console.log('%c****************************', 'color:#40aad8')
    console.log('%c*  X-Class:', 'color:#40aad8', response.headers['x-class'])
    console.log('%c*  X-Env-Type:', 'color:#40aad8', response.headers['x-env-type'])
    console.log('%c*  JSON Data:', 'color:#40aad8', response.data)
    console.log('%c*  response:', 'color:#40aad8', response)
    // console.groupEnd()
    console.log('%c****************************', 'color:#40aad8')
  },

  async send(options = {}, loading) {
    showLoading(loading)
    // await AuthTools.syncToken()
    const token = await AuthTools.getTokenAsync()
    // if (process.env.NODE_ENV === 'development') {
    //  const auth = await AuthTools.getAuthInfoAsync()
    // console.log('auth info for dev', auth)
    // }
    const auth = await AuthTools.getAuthInfoAsync()
    console.log('auth info for dev', auth)

    let result = {}
    const requestHeader = {
      ...options.headers,
      Authorization: token,
    }
    try {
      const resp = await this.fetch({
        ...options,
        headers: requestHeader,
      })
      const headers = {}
      keys(resp.header).map((key) => {
        headers[key.toLocaleLowerCase()] = resp.header[key]
      })
      this.logResp({ ...resp, headers })

      const xclass = headers['x-class']
      const xredirect = headers['x-redirect']
      const xenvtype = headers['x-env-type'] || 'product'
      if (xenvtype !== 'product' && !this.showDebugFlag) {
        Taro.eventCenter.trigger('showDebugFlag')
        this.showDebugFlag = true
      }

      const { statusText, status, data } = resp
      result = {
        xclass,
        xredirect,
        data,
        message: statusText,
        status,
        headers,
      }
    } catch (error) {
      const { status } = error
      console.log('Request exception', error)
      result = {
        xclass: systemErrorXClass,
        message: `error code:${status}`,
        data: {
          ...(error.response || {}),
        },
      }
    }
    const success = !this.isFailedResult(result)
    await hideLoading(loading)
    result.success = success
    if (!success) {
      showError(result)
    }
    return result
  },
}

export default HttpRequest
