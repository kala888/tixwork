/**
 * Action 属性
 *  id, //一般用来做来循环的唯一key
 *  title, 用于button的展示
 *  code, 语义化id
 *  imageToUrl, // icon和imageUrl, imageUrl优先
 *  icon, // icon和imageUrl, imageUrl优先
 *  linkToUrl,  //支持h5，page://, request请求
 *  confirm, //如果不为空，则在点击后弹出confirm的popup
 *  statInPage , //true为Ajax
 *  params = {}, //用来构造请求参数的列表
 *  asForm,//用form的形式来提交数据, 说白了就是，提交以form的形式提交一个字段，供后台使用: formData=JSON.stringify(params)
 *  arrayMerge = 'replace', // dva model merge的时候，数组如何处理
 *  onSuccess = noop, // onSuccess的回调
 *  loading,  // 怎么处理loading，需要设置为LoadingType
 *  navigationMethod,  // Taro 在做页面跳转时候的option参数，例如  navigationMethod: 'redirectTo' ,
 *  effectAction // action还能指定获得结果后，触发哪个effect
 *  stateAction  // action还能指定获得结果后，触发哪个state
 */

import ObjectUtils, { noop } from '@/utils/object-utils';
import _ from 'lodash';
import type { ActionLike, EleObject } from './nice-router-types';

const SUBMIT_CODE_LIST = ['nextStep', 'commit', 'next', 'nextRecord'];

/**
 * 返回Uri，/开头
 * @param action
 */
const getActionUri = (action: any): string => {
  if (_.isString(action)) {
    return action;
  }
  const uri = action?.linkToUrl || action?.uri || '';
  return '/' + _.trim(uri, '/');
};
const isActionLike = (action: any) => {
  if (_.isFunction(_.get(action, 'onClick'))) {
    return true;
  }

  if (_.isFunction(_.get(action, 'onChange'))) {
    return true;
  }
  return ObjectUtils.isNotEmpty(getActionUri(action));
};

const trans2Action = (
  routerAction = {},
): {
  params?: Record<string, any>;
  cache?: boolean;
} & ActionLike &
  EleObject => {
  // @ts-ignore
  const { action, ...others } = routerAction;
  const linkToUrl = getActionUri(action);
  const tmp = _.isObject(action) ? action : {};
  return {
    ...others,
    ...tmp,
    linkToUrl,
  };
};

const getConfirmContent = (action) => action?.confirm;

const isSubmitAction = (action = {}) => {
  const tmp = _.isString(action) ? action : _.get(action, 'code', '');
  const theCode = _.toLower(tmp);

  if (ObjectUtils.isEmpty(theCode)) {
    return false;
  }
  if (theCode.startsWith('submit') || theCode.startsWith('update') || theCode.startsWith('save')) {
    return true;
  }

  const result = _.find(SUBMIT_CODE_LIST, (it) => it.toLowerCase() === theCode);

  return ObjectUtils.isNotEmpty(result);
};

// @ts-ignore
const toSubmitActionList = (actionList: any[] = [], onSubmit?: () => void = noop) => {
  const theActionList = _.isArray(actionList) ? actionList : [actionList];
  // @ts-ignore
  return theActionList.map((it) => ({
    ...it,
    onClick: isSubmitAction(it) ? onSubmit.bind(null, it) : null,
  }));
};

const ActionUtil = {
  getActionUri,
  isActionLike,
  trans2Action,
  getConfirmContent,
  isSubmitAction,
  toSubmitActionList,
};

export default ActionUtil;
