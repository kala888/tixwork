import { Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import Q from '@/http/q';
import NavigationService from '@/nice-router/navigation-service';
import ApiConfig from '@/utils/api-config';
import { Order } from '@/types';
import WechatPayUtils from '@/utils/wechat-pay-utils';

// const mockActions = [
//   { code: 'CANCEL', title: '取消订单', uiType: 'primary' },
//   { code: 'PAY', title: '微信支付' },
//   { code: 'CONFIRM_RECEIVE', title: '确认收货' },
//   { code: 'REORDER', title: '再来一单' },
//   { code: 'VIEW', title: '查看详情' },
// ];
export default function OrderActions(props: { order: Order; onRefresh: () => void }) {
  const { order, onRefresh } = props;
  const goToDetail = () => NavigationService.goPage('/pages/order/order-detail-page', { id: order?.id });

  const { actions = [] } = order;
  const handleClick = async (e, it) => {
    e.preventDefault();
    e.stopPropagation();

    if (it.code === 'CANCEL') {
      Taro.showModal({
        title: '取消订单',
        content: '是否确认取消订单？',
        success: async (res) => {
          if (res.confirm) {
            const resp = await Q.remove(ApiConfig.cancelOrder, { id: order?.id });
            if (resp.data === true) {
              Taro.showToast({ title: '取消成功', icon: 'none' });
              onRefresh?.();
            }
          }
        },
      });
      return;
    }

    if (it.code === 'PAY') {
      await WechatPayUtils.pay(order?.id);
      onRefresh?.();
      return;
    }
    if (it.code === 'CONFIRM_RECEIVE') {
      // TODO
      Taro.showToast({ title: '确认订单', icon: 'none' });
      return;
    }
    if (it.code === 'REORDER') {
      Taro.showModal({
        title: '再来一单',
        content: '重新添加到购物车？',
        success: async (res) => {
          if (res.confirm) {
            const resp = await Q.get(ApiConfig.reorder, { id: order?.id });
            if (resp.data === true) {
              Taro.showToast({ title: '添加成功', icon: 'none' });
              await NavigationService.goPage('/pages/cart/cart-page');
            }
          }
        },
      });
      return;
    }
    if (it.code === 'VIEW') {
      goToDetail();
      return;
    }
    Taro.showToast({ title: '暂未开放', icon: 'none' });
  };

  return (
    <View className='order-item-footer'>
      {actions.map((it) => {
        return (
          <View
            key={it.code}
            className={'order-action ' + (it.uiType == 'primary' ? 'primary' : '')}
            onClick={(e) => handleClick(e, it)}
          >
            <Text className='order-action-txt'>{it.title}</Text>
          </View>
        );
      })}
    </View>
  );
}
