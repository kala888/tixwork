/**
 * Action 属性
 *  id, //一般用来做来循环的唯一key
 *  title, 用于button的展示
 *  code, 语义化id
 *  imageToUrl, // icon和imageUrl, imageUrl优先
 *  icon, // icon和imageUrl, imageUrl优先
 *  linkToUrl,  //支持h5，page://, request请求
 *  confirmContent, //如果不为空，则在点击后提出confirm要求
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
