import qs from 'qs'
import isEmpty from 'lodash/isEmpty'

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
  if (params && !isEmpty(params)) {
    const p = qs.stringify(params)
    return `${uri}?${p}`
  }
  return uri
}
