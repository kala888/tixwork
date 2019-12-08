import isEmpty from 'lodash/isEmpty'
import trim from 'lodash/trim'
import cloneDeep from 'lodash/cloneDeep'
import keys from 'lodash/keys'
import unset from 'lodash/unset'
import forIn from 'lodash/forIn'
import isNull from 'lodash/isNull'
import isUndefined from 'lodash/isUndefined'
import HttpRequest from './http-request'

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
  const { method = 'get', uri, params = {}, headers = {}, loading, asForm } = action
  console.log('backend.backendRouter, action is ', action)

  const { uri: actionUri, lastParams } = replaceUrlPlaceholder(uri, params)
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
  //
  // if (actionUri === 'mock/') {
  //   return mockData
  // }
  // if (actionUri === 'genericPageMock/') {
  //   return genericMockData
  // }

  const response = await HttpRequest.send(options, loading)
  return response
}

export default BackendService
