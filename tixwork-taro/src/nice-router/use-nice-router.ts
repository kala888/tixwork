import NavigationService from './navigation-service';
import NiceRouterUtils from './nice-router-utils';
import ObjectUtils from '@/utils/object-utils';
import { noop } from '@/utils';
import ActionUtil from '@/utils/action-util';
import GlobalToast from '@/components/global-popup/global-toast';
import { useState } from 'react';
import { NiceRouterState } from './nice-router-types';
import HttpRequest from '@/http/http-request';
import LoadingType from '@/nice-router/loading-type';

export default function useNiceRouter() {
  const [state, setState] = useState<NiceRouterState>({});
  const saveData = (data, navigationOption) => {
    console.log('saveData....', data, navigationOption);
    setState((pre: any) => {
      const { statInPage, arrayMerge, dataRefresh } = navigationOption;
      // 如果是refresh page 就不merge数据
      const doMerge = dataRefresh ? false : statInPage;
      const result = NiceRouterUtils.mergeState(pre, data, doMerge, arrayMerge);
      return result || pre;
    });
  };

  // 主路由逻辑
  const routeTo = async (action) => {
    console.log('niceRouter/router Router Payload', action);
    const {
      statInPage = false,
      params = {},
      asForm,
      arrayMerge = 'replace',
      onSuccess = noop,
      loading,
      navigationMethod,
      dataRefresh,
    } = action;

    const linkToUrl = ActionUtil.getActionUri(action);

    if (ObjectUtils.isEmpty(linkToUrl)) {
      console.warn('store.modules.router.route","can not send empty url to backend');
      return;
    }

    const withLoading = loading || (asForm ? LoadingType.Modal : LoadingType.None);

    if (asForm) {
      const cached = await NiceRouterUtils.isCachedForm(linkToUrl, params);
      if (cached) {
        GlobalToast.show({
          text: '操作太快了，换句话试试',
          duration: 2000,
        });
        return;
      }
    }

    // saveLatestRoute(action);
    const resp: API.CustomResponse = await HttpRequest.request(linkToUrl, { ...action, loading: withLoading });
    const { success, xClass, xNavigationMethod } = resp;

    const data = resp.data?.data;
    // onSuccess回调
    onSuccess(data, resp);

    //获取ViewMapping 处理预支的state和effect，以及页面跳转
    if (xClass) {
      // onSuccess回调
      const { modelActions, pagePath, pageChanged } = NiceRouterUtils.getViewMapping(xClass, dataRefresh || statInPage);

      const navigationOption = { statInPage, arrayMerge, dataRefresh };

      saveData(data, navigationOption);

      for (let i = 0; i < modelActions.length; i++) {
        const modelAction = modelActions[i];
        if (ObjectUtils.isNotEmpty(modelAction)) {
          await NavigationService.dispatch(modelAction, data);
        }
      }

      //页面跳转逻辑处理
      // 1.后台指定xNavigationMethod
      // 2.前台指定navigationMethod
      // 3.默认都未指定时候，计算得出的pageChanged
      if (xNavigationMethod || navigationMethod || pageChanged) {
        await NavigationService.goPage(pagePath, {}, { navigationMethod: xNavigationMethod || navigationMethod });
      }

      if (success && asForm) {
        // noinspection JSIgnoredPromiseFromCall
        await NiceRouterUtils.cacheForm(linkToUrl, params);
      }
    }
  };

  return {
    root: state,
    route: routeTo,
  };
}
