const ApiConfig = {
  Home: '/app/home',
  Catalog: '/app/catalog',
  Cart: '/app/cart/load-cart',
  Me: '/app/me',
  Login: '/auth/login',
  Logout: '/auth/logout',
  AboutUs: '/app/about-us',
  getHomeProduct: '/app/product/home-products/:transactionId',

  OrderDetail: '/app/order/detail/:id',
  OrderList: '/app/order/list/:status',

  Marketing: '/app/marketing/:type/:id',

  getPayInfo: '/app/pay/pay-info/:id',
  getPayResult: '/app/pay/callback/:id',

  Product: '/app/product/:id',
  searchProduct: '/app/product/search/:keyword',
  getTopSellProducts: '/app/product/top-sell/:limit',

  Brand: '/app/brand/:id',
  AddressBook: '/app/address-book',
  getArticle: '/app/article/:id',
  getAddressBookList: '/app/address-book/list',

  addressBook: '/app/address-book/:id',
  getDefaultAddressBook: '/app/address-book/default',
  getActiveCoupons: '/app/coupon/active-list',
  getCouponList: '/app/coupon/list',

  updateCommerceItem: '/app/cart/commerce-item',
  clearCommerceItem: '/app/cart/commerce-item',
  repriceCart: '/app/cart/reprice',
  applyCoupon: '/app/cart/apply-coupon',
  submitOrder: '/app/cart/submit',
  reorder: '/app/cart/reorder/:id',

  cancelOrder: '/app/order/cancel/:id',

  BindMobile: 'bindMobile',
  VerifyCode: 'verifyCode/:mobile',
  OSSToken: 'wxappService/customGetOssToken/',
  Search: 'test/search/:keyword',
  Detail: 'policyguide/policy/:id',
  getMobileVerifyCode: '/api/verifyCode/:mobile',

  upload: '/system/oss-object/upload',
  updateProfile: '/app/profile/update',
};

export default ApiConfig;
