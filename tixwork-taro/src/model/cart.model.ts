import { StoreDataPayload } from '@/nice-router/nice-router-types';
import { useState } from 'react';
import NiceRouterUtils from '@/nice-router/nice-router-utils';
import { Cart, CommerceItem, SKU } from '@/types';
import _ from 'lodash';
import Taro from '@tarojs/taro';
import GlobalToast from '@/components/global-popup/global-toast';
import Config from '@/utils/config';
import ApiConfig from '@/utils/api-config';
import Q from '@/http/q';

export type CartModel = {
  root: Cart;
  save: (params: StoreDataPayload) => void;
  clear: () => void;
  setState: (state: any) => void;
  selectAll: () => void;
  selectItem: (item: CommerceItem) => void;
  load: () => void;
  addToCart: (sku: SKU) => Promise<void>;
  subtractQuantity: (sku: SKU) => void;
  updateQuantity: (sku: SKU, quantity: number) => void;
};

const defaultCart = {
  lineItemList: [],
  title: Config.name,
};

export function useCartModel() {
  const [state, setState] = useState<Cart>(defaultCart);

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

  const _updateState = async (data: any) => {
    const items = (data?.lineItemList || []).map((it) => ({ ...it, selected: true }));
    setState({ ...data, lineItemList: items });

    const totalQuantity = data?.lineItemList.reduce((acc, it) => acc + it.quantity, 0);
    if (totalQuantity > 0) {
      Taro.setTabBarBadge({ index: 2, text: `${totalQuantity}` });
    } else {
      Taro.hideTabBarRedDot({ index: 2 });
    }
  };

  const _remove = async (items: CommerceItem[]) => {
    const data = items.map((it) => it.id);
    const resp = await Q.remove(ApiConfig.clearCommerceItem, data);
    await _updateState(resp.data);
  };

  const _update = async (sku: SKU, quantity: number, type: 'add' | 'subtract' | 'update') => {
    if (quantity < 0) {
      GlobalToast.show({
        text: '数量不能小于0',
      });
      return;
    }

    const { lineItemList = [] } = state;
    const index = _.findIndex(lineItemList, (ci: CommerceItem) => ci.sku.id === sku.id);
    const item = lineItemList[index];
    //1. quantity初始值
    let theQuantity = index > -1 ? item.quantity : 0;

    //2.根据type计算最终值
    if (type === 'add') {
      theQuantity += quantity;
    }
    if (type === 'subtract') {
      theQuantity -= quantity;
    }
    if (type === 'update') {
      theQuantity = quantity;
    }
    if (theQuantity > 0) {
      const resp = await Q.post(ApiConfig.updateCommerceItem, {
        id: item?.id,
        sku: { id: sku.id },
        quantity: theQuantity,
      });
      if (resp.code === 401) {
        Taro.navigateTo({
          url: '/pages/login/login-page',
        });
        return;
      }
      await _updateState(resp.data);
      return;
    }
    await _remove([item]);
  };

  const addToCart = async (sku: SKU) => _update(sku, 1, 'add');
  const subtractQuantity = async (sku: SKU) => _update(sku, 1, 'subtract');
  const updateQuantity = async (sku: SKU, quantity: number) => _update(sku, quantity, 'update');

  const selectAll = async () => {
    const { lineItemList = [] } = state;
    const selectedItems = lineItemList.filter((it) => it.selected);
    if (selectedItems.length === lineItemList.length) {
      setState((prevState) => ({ ...prevState, lineItemList: lineItemList.map((it) => ({ ...it, selected: false })) }));
    } else {
      setState((prevState) => ({ ...prevState, lineItemList: lineItemList.map((it) => ({ ...it, selected: true })) }));
    }
  };

  const selectItem = async (item: CommerceItem) => {
    const { lineItemList = [] } = state;
    const theItem = _.find(lineItemList, (ci: CommerceItem) => ci.id === item.id);
    // @ts-ignore
    theItem.selected = !theItem.selected;
    setState((prevState) => ({ ...prevState, lineItemList }));
  };

  const remove = async (item: CommerceItem) => await _remove([item]);

  const clear = async ({ type }: { type?: 'clear' | 'selected' }) => {
    const { lineItemList = [] } = state;
    const items = type === 'clear' ? lineItemList : lineItemList.filter((it) => it.selected);
    await _remove(items);
  };

  const load = async () => {
    try {
      const resp = await Q.get(ApiConfig.Cart);
      await _updateState(resp.data);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    root: state,
    save,
    setState,
    clear,
    remove,
    selectAll,
    selectItem,
    addToCart,
    subtractQuantity,
    updateQuantity,
    load,
  };
}
