import _ from 'lodash';
import {
  CouponStatus,
  CustomerType,
  DeliveryMethod,
  DeliveryStatus,
  OrderStatus,
  PackagingGroup,
  PaymentMethod,
  PaymentStatus,
  ProductType,
} from '@/types';
import ObjectUtils from '@/utils/object-utils';

const PRODUCT_TYPE: Record<ProductType, string> = {
  HARD_GOOD: '商品',
  RAW: '原料',
  SOFT_GOOD: '服务',
  PACKAGE: '包装',
  ACCESSORIES: '配件',
  OTHERS: '其他',
};

const PACKAGING_GROUP: Record<PackagingGroup, string> = {
  LOOSE: '散茶',
  SMALL_BAG: '小泡袋',
  CAN: '罐（盒）装',
  GIFT_BOX: '礼盒',
  TEA_SET: '茶具',
  OTHERS: '其他',
};

const DELIVERY_METHOD: Record<DeliveryMethod, string> = {
  PICKUP: '自提',
  EXPRESS: '快递',
  FLASH: '闪送',
  OTHERS: '其他',
};
const ORDER_STATUS: Record<OrderStatus, string> = {
  PENDING: '处理中',
  COMPLETED: '已完成',
  CANCELED: '已取消',
};

const PAYMENT_STATUS: Record<PaymentStatus, string> = {
  PENDING: '待支付',
  PAYING: '待支付', // 前端显示为待支付，实际为支付中
  PARTIAL: '部分支付',
  COMPLETED: '已支付',
  CANCELED: '已取消',
};

const DELIVERY_STATUS: Record<DeliveryStatus, string> = {
  WAITING: '待处理',
  PENDING: '待发货',
  PARTIAL: '部分发货',
  SHIPPED: '已发货',
  COMPLETED: '已完成',
  CANCELED: '已取消',
};
const PAYMENT_METHOD: Record<PaymentMethod, string> = {
  WECHAT: '微信',
  ALIPAY: '支付宝',
  CASH: '现金',
  CREDIT_CARD: '银行卡',
  OTHERS: '其他',
};
const COUPON_STATUS: Record<CouponStatus, string> = {
  CREATED: '未使用',
  USED: '已使用',
  EXPIRED: '已过期',
};
const CUSTOMER_TYPE: Record<CustomerType, string> = {
  STANDARD: '普通会员',
  VIP: '尊享会员',
  CHANEL: '渠道客户',
};

const types = {
  PRODUCT_TYPE,
  PACKAGING_GROUP,
  DELIVERY_METHOD,
  ORDER_STATUS,
  PAYMENT_STATUS,
  DELIVERY_STATUS,
  PAYMENT_METHOD,
  COUPON_STATUS,
};

const CandidateUtils = {
  productType: (code?: string) => _.get(PRODUCT_TYPE, _.toUpper(code), code),
  packagingGroup: (code?: string) => _.get(PACKAGING_GROUP, _.toUpper(code), code),
  deliveryMethod: (code?: string) => _.get(DELIVERY_METHOD, _.toUpper(code), code),
  orderStatus: (code?: string) => _.get(ORDER_STATUS, _.toUpper(code), code),
  paymentStatus: (code?: string) => _.get(PAYMENT_STATUS, _.toUpper(code), code),
  deliveryStatus: (code?: string) => _.get(DELIVERY_STATUS, _.toUpper(code), code),
  paymentMethod: (code?: string) => _.get(PAYMENT_METHOD, _.toUpper(code), code),
  couponStatus: (code?: string) => _.get(COUPON_STATUS, _.toUpper(code), code),
  getCustomerType: (code?: string) => _.get(CUSTOMER_TYPE, _.toUpper(code), code),
  getOptions: (type) => {
    const options = types[type];
    console.log('ooooo', options);
    if (ObjectUtils.isEmpty(options)) {
      return [];
    }
    return _.keys(options).map((key) => ({
      id: key,
      title: options?.[key],
    }));
  },
};
export default CandidateUtils;
