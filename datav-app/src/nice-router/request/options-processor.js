import _ from 'lodash'
import Config from '@/nice-router/nice-router.config'

const pathToRegexp = require('path-to-regexp')

function getUrlAndParam(uri, params) {
  const processedParams = _.cloneDeep(params)
  let url = uri

  let domain = ''
  if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
    // eslint-disable-next-line no-extra-semi
    ;[domain] = uri.match(/[a-zA-z]+:\/\/[^/]*/)
    url = url.slice(domain.length)
  }
  const toPath = pathToRegexp.compile(url)
  try {
    url = toPath(params)
  } catch (e) {
    console.warn(
      '解析uri错误, 多半是带":"的替代变量为空了，请尽量避免在url中使用":"',
      e,
    )
  }

  const match = pathToRegexp.parse(url)
  match.forEach((item) => {
    const { name: key } = item
    if (item instanceof Object && key in processedParams) {
      delete processedParams[key]
    }
  })

  const prefix = domain || Config.baseURL

  return {
    url: prefix + url,
    params: processedParams,
  }
}

const OptionsProcessor = (url, options) => {
  const { method = 'GET', params, headers } = options
  const { url: lUrl, params: lParams } = getUrlAndParam(url, params)

  const requestHeader = _.clone(headers)
  // if (method.toLocaleLowerCase() === 'post') {
  //   requestHeader['Content-Type'] = 'application/x-www-form-urlencoded'
  // }

  const req = {
    url: lUrl,
    options: {
      getResponse: true,
      ...options,
      method: method.toLocaleLowerCase(),
      headers: requestHeader,
      requestType: method.toLocaleLowerCase() === 'post' ? 'form' : 'json',
      params: lParams,
    },
  }
  if (method.toLocaleLowerCase() === 'post' || method.toLocaleLowerCase() === 'put') {
    req.options.data = lParams
    req.options.params = {}
  }
  return req
}

export default OptionsProcessor
