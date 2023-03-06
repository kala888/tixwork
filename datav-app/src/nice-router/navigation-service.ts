import React from 'react'
import ActionUtil from './action-util'
import { CommonActions } from '@react-navigation/native'
import { Modal } from '@ant-design/react-native'

import { isEmpty, isNotEmpty, LoadingType, noop } from './nice-router-util'
import AuthTools from '@/nice-router/auth-tools'
import ProtectedChecker from '@/service/touch-id/protected-checker'
import TouchIdTools from '@/service/touch-id/touch-id-tools'
import { RouterPayload } from '@/nice-router/nice-router.model'
import { ActionLike } from '@/nice-router/nice-router-types'
import _ from 'lodash'
import { Store } from 'redux'
import { H5PageProps } from '@/nice-router/h5.page'


//  push='navigateTo'
//  replace='redirectTo'
//  back='navigateBack'
//  switchType='switchTab'
//  reLaunch='reLaunch';
export type NavigationMethodType = 'push' | 'replace' | 'back' | 'reLaunch' | 'switchTab';

// TODO 需要做逻辑转换
// const NavigationMethodMap = {
//   push: 'navigateTo',
//   replace: 'redirectTo',
//   back: 'navigateBack',
//   switchType: 'switchTab',
//   reLaunch: 'reLaunch',
// }

// 约定：pagePath 就是定义在app.config中的页面名称或者路径, 不再使用pageName, 沿用Taro叫法
// 约定：uri或者url就是：协议 + pathPath + 参数，不再使用path之类

type NavigationOptionType = {
  delayCallBack?: boolean;
} & RouterPayload;


type RouteFunction = (
  action: string | ActionLike | object,
  params?: Record<string, any>,
  options?: NavigationOptionType,
) => Promise<any> | null;


// Local page
const NICE_ROUTER_LOCAL_PROTOCOL = 'page://'

//判断是否是本地页面跳转协议，例如 page:///pages/biz/listof-test-page
const isLocalPage = (uri = '') => uri.trim().startsWith(NICE_ROUTER_LOCAL_PROTOCOL)
//移除首尾空格和自定义协议page://
const trimUri = _.memoize((uri = '') => _.replace(_.trim(uri), NICE_ROUTER_LOCAL_PROTOCOL, ''))
const isH5Page = _.memoize((uri = '') => uri.trim().toLowerCase().startsWith('http'))

const parseUri = (uri: string): { pagePath: string; params: Record<string, string> } => {
  const url = trimUri(uri)
  const urlData = url.split('?')
  let params = {}
  if (isNotEmpty(urlData)) {
    const strAry = _.split(urlData[1], '&').map((i) => i.split('='))
    params = _.fromPairs(strAry)
  }
  const pagePath = urlData[0]
  return { pagePath, params }
}


export const navigationRef = React.createRef()
export const currentScreenRef = React.createRef()

class NavigationServiceClass {
  _container: Store = {} as Store // eslint-disable-line

  get container() {
    return this._container || {}
  }

  set container(container: Store) {
    if (!container) {
      return
    }
    this._container = container
  }

  /**
   * redux dispatch
   * @param actionType redux action name
   * @param params the parameters key-value map
   */
  dispatch(actionType: string, params?: Record<string, any>): void {
    const { dispatch: dispatchFunc } = this.container
    if (!dispatchFunc) {
      console.log('can not find dispatch in', this.container)
      return
    }
    dispatchFunc({ type: actionType, payload: params })
  }

  getNavigation(props?: any) {
    const navigation = navigationRef.current ? navigationRef.current : {}
    // @ts-ignore
    const { dispatch, navigate } = navigation
    return {
      // @ts-ignore
      ...navigation,
      dispatch: dispatch || props.dispatch || noop,
      navigate: navigate || props.navigate || noop,
    }
  }


  /**
   *
   * @param delta
   * @param data
   * @param _page
   * @returns {Promise<any>}
   *
   * eg. 后退传参 NavigationService.back({data},this)
   */
  back(params = {}) {
    const navigation = this.getNavigation()
    navigation.dispatch({
      ...CommonActions.goBack(),
      ...params,
    })
  }


  /**
   *
   * @param routeName
   * @param params
   * @param options
   * @returns {Promise<any>}
   */
  navigate(routeName: string, params: Record<string, any> = {}, options?: NavigationOptionType): Promise<any> {
    const { navigationMethod } = options || {}
    if (isNotEmpty(navigationMethod)) {
      console.log('todo process', navigationMethod)
    }
    if (isEmpty(routeName)) {
      console.log('dont need to navigation')
      // @ts-ignore
      return
    }
    const navigation = this.getNavigation()
    return navigation.navigate(routeName, params)
  }


  put: RouteFunction = (action, params, options) => {
    return this.routeTo(action, params, {
      ...options,
      method: 'put',
    })
  }

  view: RouteFunction = (action, params, options) => {
    return this.routeTo(action, params, options)
  }

  ajax: RouteFunction = (action, params, options) => {
    return this.routeTo(action, params, {
      loading: LoadingType.None,
      statInPage: true,
      ...(options || {}),
    })
  }

  post: RouteFunction = (action, params, options) => {
    return this.routeTo(action, params, {
      ...(options || {}),
      method: 'post',
    })
  }


  routeTo: RouteFunction = async (theAction, theParams, theOptions) => {
    console.log('route to ', theAction)
    const action = ActionUtil.trans2Action({
      action: theAction,
      params: theParams,
      ...theOptions,
    })
    const { linkToUrl = '', params, statInPage } = action
    // const { linkToUrl = '', cache = false, params, statInPage } = action
    if (isEmpty(linkToUrl)) {
      console.log('THE ACTION linkToUrl IS EMPTY')
      return
    }

    const cb = () => {
      // 1, 前端页面跳转, page:///pages/home/home-page?type=qa 或跳转到HomePage的screen
      if (!statInPage && isLocalPage(linkToUrl)) {
        const { params: queryParams, pagePath } = parseUri(linkToUrl)
        return this.navigate(pagePath, { ...params, ...queryParams })
      }

      // 2, H5跳转：目标页面是Http页面，小程序中需要跳转到webview
      if (!statInPage && isH5Page(linkToUrl)) {
        const h5Param: H5PageProps = { uri: linkToUrl }
        return this.navigate('H5Page', h5Param)
      }

      // 发送请求
      return this.dispatch('niceRouter/route', action)
    }

    // action上带有属性，confirmContent, 触发先confirm再执行相关动作
    const confirmContent = ActionUtil.getConfirmContent(action)
    if (isNotEmpty(confirmContent)) {
      Modal.alert(action.title, confirmContent, [
        {
          text: '取消',
          onPress: () => console.log('cancel'),
          style: 'cancel',
        },
        //这里把没有用navigate，是因为scanner注册的事件还在，confirm页面还能修改数据
        { text: '确定', onPress: cb },
      ])
      return
    }

    cb()

  }


  async safeView(props) {
    const { needLogin = true } = props

    //1.无需登录，直接过
    if (!needLogin) {
      this.view(props)
      return
    }

    //2. token 失效，跳登录
    const isLogin = await AuthTools.isLoginToken()
    if (!isLogin) {
      await this.navigate('LoginPage', { callbackAction: props })
      return
    }

    //3. token有效，校验touchId保护
    ProtectedChecker.checkLogin().then((result) => {
      // 3.1 通过，直接pass
      if (result === ProtectedChecker.CHECK_PASSED) {
        this.view(props)
        return
      }
      // 3.1 普通登录，同2
      if (result === ProtectedChecker.COMMON_LOGIN_OPTION) {
        this.navigate('LoginPage', { callbackAction: props })
        return
      }
      // 3.1 需要TouchIdLogin，直接校验touchID
      if (result === ProtectedChecker.FACE_LOGIN_OPTION) {
        const { doTouchIdLogin } = TouchIdTools.g()
        doTouchIdLogin().then(() => {
          this.view(props)
        })
      }
    })
  }

}

const NavigationService = new NavigationServiceClass()

export default NavigationService
