import _ from 'lodash'


export enum LoadingType {
  None,
  Top,
  Modal,
  FetchingNext,
  BarLoading,
}

export const createAction = (type) => (payload) => ({ type, payload })
export const noop = () => {
}

export const sleep = async (longTime) =>
  new Promise((resolve) => setTimeout(resolve, longTime))

export function log(...params) {
  console.log(
    '%c nice-router: ',
    'color:#8add4c; text-shadow: 0.5px 0.5px 0.5px grey',
    ...params,
  )
}

// null=> true
// nil=> true
// true=> true
// 1 => false
// [1,2]=> false
// {} => true
// {a:'1'} => false
export const isEmpty = (value) => {
  if (typeof value === 'number' || typeof value === 'boolean') {
    return false
  }
  return _.isEmpty(value)
}
export const isNotEmpty = (value) => {
  return !isEmpty(value)
}
export const toBoolean = (value) => {
  if (isEmpty(value)) {
    return false
  }
  if (typeof value === 'boolean') {
    return value
  }
  if (typeof value === 'string') {
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


export function parseJSON(value) {
  if (value !== null && typeof value === 'object') {
    return value
  }
  if (typeof value === 'string') {
    try {
      return JSON.parse(value)
    } catch (e) {
      return {}
    }
  }
  console.warn('shouldBeObject is not controlled value', value)
  return value
}

/**
 * 字符长度
 * 一个中文两个字符,
 */
export const codeLength = _.memoize((str) => _.reduce(str, (sum, it) => sum + (it.charCodeAt(0) > 255 ? 2 : 1), 0))
