import isEmpty from 'lodash/isEmpty'
import trim from 'lodash/trim'
import cloneDeep from 'lodash/cloneDeep'
import keys from 'lodash/keys'
import unset from 'lodash/unset'
import forIn from 'lodash/forIn'
import { LoadingType } from '@/nice-router/nice-router-util'
import isNull from 'lodash/isNull'
import isUndefined from 'lodash/isUndefined'

import HttpRequest from './http-request'
import mockData from '../mock-data-genericpage'

const EMPTY_PARAMETER_TOKEN = '+'
const BackendService = {}

const replaceUrlPlaceholder = (pUri, params) => {
  let lastParams = params
  let uri = pUri
  if (!isEmpty(params) || trim(pUri)) {
    lastParams = cloneDeep(params)
    keys(params).forEach((key) => {
      const tmp = `:${key}`
      if (tmp && uri.indexOf(tmp) > -1) {
        uri = uri.replace(tmp, params[key] || EMPTY_PARAMETER_TOKEN)
        unset(lastParams, key)
      }
    })
  }
  return { uri, lastParams }
}

function removeEmptyValues(params = {}) {
  const result = {}
  forIn(params, (value, key) => {
    if (!isUndefined(value) && !isNull(value)) {
      result[key] = value
    }
  })
  return result
}

BackendService.send = async (action = {}) => {
  const {
    method = 'get', // get,post,put 等http方法
    uri, // uri或者url
    params = {}, // 请求的参数
    headers = {}, // 请求header
    loading = LoadingType.none, //loading的处理方式
    asForm, // 请后台约定，如果是form提交的话，把body包装成一个json字符串放到body里面
  } = action

  // 将url中的替代变量替换掉
  const { uri: actionUri, lastParams } = replaceUrlPlaceholder(uri, params)
  // 移除undefined，null的数据，不然daas接受处理有点小问题
  let data = removeEmptyValues(lastParams)
  if (asForm) {
    data = { formData: JSON.stringify(data) }
  }
  const options = {
    uri: actionUri,
    method,
    params: data,
    headers,
  }
  // mock 数据处理
  if (actionUri === 'mock/') {
    return mockData
  }
  return HttpRequest.send(options, loading)
}

export default BackendService
