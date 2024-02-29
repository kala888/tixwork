import { ActionLike } from '@/nice-router/nice-router-types';

export type ProductType = 'HARD_GOOD' | 'RAW' | 'SOFT_GOOD' | 'PACKAGE' | 'ACCESSORIES' | 'OTHERS';
export type PackagingGroup = 'LOOSE' | 'SMALL_BAG' | 'CAN' | 'GIFT_BOX' | 'TEA_SET' | 'OTHERS';
export type DeliveryMethod = 'PICKUP' | 'EXPRESS' | 'FLASH' | 'OTHERS';
export type OrderStatus = 'PENDING' | 'COMPLETED' | 'CANCELED';
export type PaymentStatus = 'PENDING' | 'PAYING' | 'PARTIAL' | 'COMPLETED' | 'CANCELED';
export type DeliveryStatus = 'WAITING' | 'PENDING' | 'PARTIAL' | 'SHIPPED' | 'COMPLETED' | 'CANCELED';
export type PaymentMethod = 'WECHAT' | 'ALIPAY' | 'CASH' | 'CREDIT_CARD' | 'OTHERS';
export type CouponStatus = 'CREATED' | 'USED' | 'EXPIRED';
export type CustomerType = 'STANDARD' | 'VIP' | 'CHANEL';

export type MarketingType = 'brand' | 'promotion' | 'topic';

export type HomeData = {
  slideList?: ActionLike[];
  actionFloorList?: ActionLike[];
  section?: Section;
  transactionId: string;
};

export type Section = {
  id: number;
  title: string;
  brief?: string;
  linkToUrl?: string;
  items: any[];
  displayMode?: string;
};

export type Marketing = {
  id?: number;
  title?: string;
  marketingType: MarketingType;
  brand?: ProductBrand;
  detailImage?: ProductBrand;
  detail?: string;
  sectionList?: Section[];
};

type BaseEntity = {
  id: number;
  name: string;
  imageUrl?: string;
  brief?: string;
  createTime?: string;
  extraData?: Record<string, any>;
};

export type Store = {
  logo?: string;
  qrCode?: string;
  categoryList: Category[];
} & BaseEntity;

export type Catalog = {
  title: string;
  categoryList: Category[];
} & BaseEntity;

export type CommerceItem = {
  id: number;
  sku: SKU;
  quantity: number;
  selected?: boolean;
  updateTime: string;
  skuSnapshot: string;
};

export type Cart = {
  title?: string;
  lineItemList: CommerceItem[];
  defaultAddress?: AddressBook;
};
export type ShippingInfo = {
  id: number;
  contactUser: string;
  contactMobile: string;
  deliveryAddress: string;
  deliveryMethod: DeliveryMethod;
  trackingNumber: string;
  deliveryFee: number;
  deliveryTime: string;
  deliveryStatus: DeliveryStatus;
};

export type PaymentInfo = {
  paymentMethod: PaymentMethod;
  paymentBrief: string;
  paymentStatus: PaymentStatus;
  paymentTime: string;
};

export type Order = {
  id: number;
  bizId: string;
  lineItemList: CommerceItem[];
  orderStatus: OrderStatus;
  coupon: Coupon;
  total: number;
  amount: number;
  quantity: number;
  brief: string;
  submitTime: string;
  orderChangeLog: any[];
  paymentInfo?: PaymentInfo;
  shippingInfo?: ShippingInfo;
  statusReason?: string;
  tips?: string;
  actions?: ActionLike[];
} & BaseEntity;

export type AddressBook = {
  id: number;
  contactUser: string;
  contactAddress: string;
  contactMobile: string;
  isDefault: boolean;
};

export type Active = {
  content?: string;
  imageUrl?: string;
  productList?: Product[];
} & BaseEntity;

export type Promotion = {
  id?: number;
  displayName?: string;
  name?: string;
  promotionType?: string;
  promotionStatus?: string;
  startTime?: string;
  endTime?: string;
  promotionRule?: string;
  tenantId?: string;
  delFlag?: string;
};
export type Coupon = {
  id?: number;
  displayName?: string;
  brief?: string;
  couponCode?: string;
  couponStatus?: CouponStatus;
  usedTime?: string;
  promotion: Promotion;
  expiredTime?: string;
  //
  //
  // tag?: string;
  // discount: number;
  // min: number;
  // startDate: string;
  // endDate: string;
  // rule: string;
  // code?: string;
  // status: CouponStatus;
};

type ProductStatus = 'in_stock' | 'out_of_stock' | 'discontinued' | 'not_for_sale';

export type SKU = {
  id: number;
  name: string;
  specification: string;
  product: Product;
  unit: { displayName: string; id: number };
  recommend: string; //推荐语
  series: { displayName: string; id: number };
  packagingGroup: PackagingGroup;
  heroImage: string;
  skuImageList: string[];
  skuDetailImage: string;
  skuDetail: string;
  status: ProductStatus;
  inventory: number;
  listPrice: number;
  salePrice?: number;
  infoList?: { title: string; value: string }[];
};

export type Product = {
  id: number;
  name: string;
  brief: string;
  productType: ProductType;
  heroImage: string;
  brand?: ProductBrand;
  productReview: string; //品评
  brewingSuggestion: string; //冲泡建议

  priceRange?: { max: number; min: number };
  skuList?: SKU[];
  tags?: string[];
  // status: ProductStatus;
  onSale: boolean;
  onBestSale: boolean;
  onRecommend: boolean;
  onNew: boolean;
  onClearance: boolean;
  status: ProductStatus;
};

export type Category = {
  id: number;
  name: string;
  brief: string;
  heroImage: string;
  parent?: Category;
  productList: Product[];
};

export type ProductBrand = {
  logo: string;
  detailImage: string;
  productList: Product[];
} & BaseEntity;

export type Profile = {
  userId: number;
  customerType: CustomerType;
  nickName: string;
  mobile: string;
  avatar: string;
  lineActions: ActionLike[];
  orderActions: ActionLike[];
};
