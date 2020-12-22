import _ from 'lodash'
import { isNotEmpty, LoadingType, log } from '../nice-router-util'
import StorageTools from '../storage-tools'
import HttpRequest from './http-request'
import MockService from './mock-service'
import TestData from '../../pages/mock-data/test-data'

TestData.initial()

const EMPTY_PARAMETER_TOKEN = '+'
const BackendService = {}

const replaceUrlPlaceholder = (uri = '', params) => {
  let theParams = _.cloneDeep(params)
  let theUri = _.trim(uri)
  theUri = theUri.replace(/:[^:/ ]+/g, (token) => {
    const key = _.trim(token, ':')
    const value = _.get(params, key, EMPTY_PARAMETER_TOKEN)
    _.unset(theParams, key)
    return value
  })
  return { uri: theUri, params: theParams }
}

function removeEmptyValues(params = {}) {
  const result = {}
  _.forIn(params, (value, key) => {
    if (!_.isNil(value)) {
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
    cache = 0,
  } = action

  // 将url中的替代变量替换掉
  const { uri: actionUri, params: lastParams } = replaceUrlPlaceholder(uri, params)
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
  const mockData = MockService.getMockResp(actionUri)
  if (mockData) {
    return mockData
  }

  console.log('do request, then cache it', cache)
  if (cache > 0) {
    const resp = StorageTools.get(actionUri)
    if (isNotEmpty(resp)) {
      return resp
    }
  }

  const resp = await HttpRequest.send(options, loading)
  if (cache > 0 && isCacheable(resp)) {
    console.log('success resp and then cache it', cache, 'seconds', resp)
    StorageTools.set(actionUri, resp, cache)
  }
  return resp
}

function isCacheable(resp) {
  if (!_.isObject(resp)) {
    return false
  }
  const { headers = {} } = resp
  if (headers['x-redirect'] === true || headers['x-redirect'] === 'true') {
    return false
  }
  const xclass = headers['x-class'] || ''
  if (xclass.indexOf('LoginForm') > -1) {
    log('the response will not cached, bc the xclass in blacklist')
    return false
  }
  return true
}

export default BackendService
