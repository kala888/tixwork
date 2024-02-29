import useNiceRouter from '@/nice-router/use-nice-router';
import { useState } from 'react';
import NiceRouterUtils from '@/nice-router/nice-router-utils';
import { StoreDataPayload } from '@/nice-router/nice-router-types';
import { useCartModel } from '@/model/cart.model';

export type CommonModel<T> = {
  root: T;
  save: (params: StoreDataPayload) => void;
  clear: () => void;
  setState: (state: any) => void;
};

export function useCommonModel() {
  const [state, setState] = useState<any>({});
  const save = async (props: StoreDataPayload) => {
    const { navigationOption = {}, ...rest } = props;
    setState((pre: any) => {
      const { statInPage, arrayMerge, dataRefresh } = navigationOption;
      // 如果是refresh page 就不merge数据
      const doMerge = dataRefresh ? false : statInPage;
      const result = NiceRouterUtils.mergeState(pre, rest, doMerge, arrayMerge);
      return result || pre;
    });
  };
  return {
    root: state,
    save,
    setState,
    clear: () => setState({}),
  };
}

export const models = {
  niceRouter: useNiceRouter,
  home: useCommonModel,
  me: useCommonModel,
  cart: useCartModel,
  genericform: useCommonModel,
  genericpage: useCommonModel,
  genericpage2: useCommonModel,
  listofpage: useCommonModel,
  listofpage2: useCommonModel,
  listofpage3: useCommonModel,
  listofpage4: useCommonModel,

  marketing: useCommonModel,

  // app,
  // navigationList,
  // H5,
  // objectPicker,
};
//
