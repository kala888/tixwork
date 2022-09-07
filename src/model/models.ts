import useNiceRouter from '@/nice-router/use-nice-router';
import { useState } from 'react';
import NiceRouterUtils from '@/nice-router/nice-router-utils';
import { StoreDataPayload } from '@/nice-router/nice-router-types';

export type CommonModel<T> = {
  root: T;
  save: (params: StoreDataPayload) => void;
  clear: () => void;
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
    clear: () => setState({}),
  };
}

export const models = {
  niceRouter: useNiceRouter,
  home: useCommonModel,
  me: useCommonModel,
  genericform: useCommonModel,
  genericpage: useCommonModel,
  genericpage2: useCommonModel,
  listofpage: useCommonModel,
  listofpage2: useCommonModel,
  listofpage3: useCommonModel,
  listofpage4: useCommonModel,

  // app,
  // navigationList,
  // H5,
  // objectPicker,
};
//
