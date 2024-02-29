export default {
  pages: [
    // 'pages/test-page',
    'pages/home/home-page',
    'pages/me/me-page',
    'pages/login/login-page',
    'pages/me/user-profile-update',
    'pages/me/about-us',

    'pages/login/bind-mobile-page',

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

  permission: {
    'scope.userLocation': {
      desc: '获取微信信息以便定位到最近的店铺',
    },
  },
  requiredPrivateInfos: ['getLocation', 'chooseAddress'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#cc9172',
    navigationBarTitleText: '钛安甄选',
    navigationBarTextStyle: 'white',
    enablePullDownRefresh: true,
  },
  tabBar: {
    color: '#666',
    selectedColor: '#cc9172',
    backgroundColor: '#fafafa',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/home-page',
        iconPath: './assets/icon/home.png',
        selectedIconPath: './assets/icon/home_s.png',
        text: '首页',
      },
      {
        pagePath: 'pages/me/me-page',
        iconPath: './assets/icon/me.png',
        selectedIconPath: './assets/icon/me_s.png',
        text: '我的',
      },
    ],
  },
};
