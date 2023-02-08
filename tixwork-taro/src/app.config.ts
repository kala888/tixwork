export default {
  pages: [
    'pages/home/home-page',
    'pages/test-page',
    'pages/login/login-page',
    'pages/search/search-page',
    'pages/policy/policy-detail-page',
    'pages/login/bind-mobile-page',
    'pages/me/me-page',
    // 'pages/biz/listof-test-page', // 有问题

    // base
    'pages/h5/h5-page',
    'pages/network-error/network-exception-page',

    'listof/listof-page',
    'listof/listof-page2',
    'listof/listof-page3',
    'listof/listof-page4',
    //biz
  ],
  subPackages: [
    {
      root: 'pages/biz/',
      name: 'biz',
      pages: ['listof-test-page'],
    },
    {
      root: 'genericpage/',
      name: 'genericpage',
      pages: ['generic-page', 'generic-page2'],
    },
    {
      root: 'genericform/',
      name: 'genericform',
      pages: ['genericform-page', 'object-picker-page'],
    },
  ],

  // permission: {
  //   'scope.userLocation': {
  //     desc: '你的位置信息将用于小程序位置接口的效果展示',
  //   },
  // },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#28aaff',
    navigationBarTitleText: '新都办事指南',
    navigationBarTextStyle: 'white',
    enablePullDownRefresh: true,
  },
};
