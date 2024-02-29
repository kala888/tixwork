const Config = {
  // baseURL: 'https://www.tiandtech.com/api/', //后端服务地址
  baseURL: 'http://localhost:8080/api', //后端服务地址
  // baseURL: 'http://10.0.0.100:8080/api', //后端服务地址
  version: 1,
  name: '钛安甄选',
  appType: 'mini-program',
  // loginMode: 'wechat', // 纯微信登录
  loginMode: 'wechat-mobile', //纯微信手机号登录
  // loginMode: 'mobile',  //纯短信登录
  // loginMode: 'mix-mobile',//短信登录+微信手机号登录
  // loginMode: 'password', //账号密码登录
  clientId: '0738942da906f2fdd8b5b102bedb6d66',
};

export default Config;
