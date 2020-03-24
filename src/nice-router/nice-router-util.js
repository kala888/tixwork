import qs from 'qs'
import lodashIsEmpty from 'lodash/isEmpty'
import isNumber from 'lodash/isNumber'
import isBoolean from 'lodash/isBoolean'
import isString from 'lodash/isString'

export const LoadingType = {
  none: 100,
  top: 1,
  modal: 2,
  fetchingNext: 3,
  barLoading: 4,
}

export const createAction = (type) => (payload) => ({ type, payload })
export const noop = () => {}

export const sleep = async (longTime) => new Promise((resolve) => setTimeout(resolve, longTime))

export function toTaroUrl(uri, params) {
  if (isNotEmpty(params)) {
    const p = qs.stringify(params)
    return `${uri}?${p}`
  }
  return uri
}

export function log(...params) {
  console.log('%c nice-router: ', 'color:#8add4c; text-shadow: 0.5px 0.5px 0.5px grey', ...params)
}

// null=> true
// true=> true
// 1 => false
// [1,2]=> false
// {} => true
// {a:'1'} => false
export const isEmpty = (value) => {
  if (isNumber(value) || isBoolean(value)) {
    return false
  }
  return lodashIsEmpty(value)
}
export const isNotEmpty = (value) => {
  return !isEmpty(value)
}
export const toBoolean = (value) => {
  if (isEmpty(value)) {
    return false
  }
  if (isString(value)) {
    const p = value.toLowerCase().trim()
    if (p === 'true') {
      return true
    }
    if (p === 'false') {
      return false
    }
  }
  return value
}
