import ServerImage from '@/server-image/server-image';
import { Text, View } from '@tarojs/components';
import { CommerceItem, Order } from '@/types';
import _ from 'lodash';
import './styles.less';
import OrderActions from '@/components/biz/order-actions';
import NavigationService from '@/nice-router/navigation-service';
import { formatMoney, formatTime } from '@/utils';
import ObjectUtils from '@/utils/object-utils';
import CandidateUtils from '@/utils/candidate-utils';

const SingleItem = (props: { items: CommerceItem[] }) => {
  const { heroImage, name, specification } = props?.items[0].sku || {};
  return (
    <>
      <ServerImage src={heroImage} />
      <View className='product-info'>
        <View className='product-info-name'>{name}</View>
        <View className='product-info-brief'>{specification}</View>
      </View>
    </>
  );
};
const MultipleItems = (props: { items: CommerceItem[] }) => {
  return (
    <>
      {props?.items?.map((it) => (
        <ServerImage key={it?.sku?.id} src={it?.sku?.heroImage} />
      ))}
    </>
  );
};
type OrderItemProps = {
  order: Order;
  itemProps: any;
};

function OrderItem(props: OrderItemProps) {
  const { order, itemProps } = props;
  const { id, submitTime, bizId, amount = 0, lineItemList = [] } = order;
  const items = lineItemList.slice(0, 3).map((it) => ({
    ...it,
    sku: ObjectUtils.parseToObject(it.skuSnapshot),
  }));
  const goToDetail = () => NavigationService.goPage('/pages/order/order-detail-page', { id });

  const amountStr = _.split(formatMoney(amount), '.');
  const status = CandidateUtils.orderStatus(order.orderStatus);
  const totalQuantity = _.sumBy(lineItemList, 'quantity');
  return (
    <View className='order-item'>
      <View className='order-item-header'>
        <View className='order-item-header-title'>订单号：{bizId}</View>
        <View className='order-item-header-brief'>{status}</View>
      </View>

      <View className='order-item-body'>
        <View className='order-items'>
          {items.length === 1 ? <SingleItem items={items} /> : <MultipleItems items={items} />}
        </View>

        <View className='order-item-info' onClick={goToDetail}>
          <Text className='order-item-info-total'>共计{totalQuantity}件</Text>
          <View className='order-item-info-amount'>
            <View className='order-item-info-amount-pre'> ￥{amountStr[0]}.</View>
            <View className='order-item-info-amount-post'>{amountStr[1]}</View>
          </View>
        </View>
      </View>

      <View className='order-item-time'>
        <View>下单时间：</View>
        <View>{formatTime(submitTime)}</View>
      </View>
      <OrderActions order={order} onRefresh={itemProps?.onRefresh} />
    </View>
  );
}

export default OrderItem;
