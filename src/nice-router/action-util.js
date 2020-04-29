/*
 * Copyright(c) 2020 nice-router
 *    Date: 2020/4/29 下午2:29
 *    Author: Kala
 */
import isObject from 'lodash/isObject'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import qs from 'qs'

const getActionUri = (action) => {
  let result = action
  if (isObject(action)) {
    const { linkToUrl, uri } = action
    result = linkToUrl || uri
  }
  return result || ''
}
const isActionLike = (action) => {
  return isNotEmpty(getActionUri(action))
}

const toTaroUrl = (uri, params) => {
  if (isNotEmpty(params)) {
    const p = qs.stringify(params)
    return `${uri}?${p}`
  }
  return uri
}

const trans2Action = (routerAction = {}) => {
  const { action, ...others } = routerAction
  const linkToUrl = getActionUri(action)
  const tmp = isObject(action) ? action : {}
  return {
    ...others,
    ...tmp,
    linkToUrl,
  }
}

const getConfirmContent = (action = {}) => {
  return action.confirmContent
}

const ActionUtil = {
  getActionUri,
  isActionLike,
  toTaroUrl,
  trans2Action,
  getConfirmContent,
}

export default ActionUtil
