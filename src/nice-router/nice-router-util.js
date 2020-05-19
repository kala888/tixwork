import _ from 'lodash'

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
  if (_.isNumber(value) || _.isBoolean(value)) {
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
  if (_.isString(value)) {
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
