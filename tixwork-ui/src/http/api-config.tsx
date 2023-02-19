const ApiConfig = {
  login: '/api/login',
  logout: '/api/logout',
  getCaptchaImage: '/api/captchaImage',
  getMobileVerifyCode: '/api/verifyCode/:mobile',

  // resource 资源
  post: '/api/system/post',
  dictType: '/api/system/dict/type',
  dictData: '/api/system/dict/data',
  notice: '/api/system/notice',
  loginRecord: '/api/monitor/login-record',
  operationLog: '/api/monitor/operation-log',
  online: '/api/monitor/online',
  scheduler: '/api/monitor/scheduler',
  //common data
  dataCities: '/api/data/cities',
  dataProvinces: '/api/data/provinces',

  //oss
  oss: '/api/system/oss',
  upload: '/api/system/oss/upload',

  //profile
  profile: '/api/profile',
  updateAvatar: '/api/profile/updateAvatar',
  updatePassword: '/api/profile/updatePassword',
  updateMobile: '/api/profile/bindMobile',
  getRouters: '/api/profile/getRouters',
  getUnreadNotice: '/api/profile/getNotices',

  //config
  dict: '/api/system/dict',
  refreshCache: '/api/system/dict/refreshCache',
  configByKey: '/api/system/dict/key/:key', // 根据参数键名查询参数值, 暂未使用，可以提供前台配置

  //role
  role: '/api/system/role',
  changeRoleMenu: '/api/system/role/changeRoleMenu',
  changeRoleDataScope: '/api/system/role/changeRoleDataScope',

  // 角色状态修改 PUT /api/system/role/changeStatus
  // 取消用户角色 PUT /api/system/role/authUser/cancel

  //menu
  menu: '/api/system/menu',
  getMenuByRoleId: '/api/system/menu/tree/:roleId',
  getMenuTree: '/api/system/menu/tree',

  //user
  user: '/api/system/user',
  getPostOptions: '/api/system/user/getPostOptions',
  getRoleOptions: '/api/system/user/getRoleOptions',
  getRoleUserList: '/api/system/user/roleUserList/:roleId',
  // 角色数据权限 PUT /api/system/user/dataScope
  // 角色状态修改 PUT /api/system/user/changeStatus
  // 插入角色用户 POST /system/user/addRoleUser

  //department
  dept: '/api/system/dept',
  roleDeptTreeselect: '/api/system/dept/tree/:roleId',

  //admin相关的url
  resetUserPassword: '/api/system/admin/resetUserPassword/:userId',

  // sealProduct
  sealProduct: '/api/engineseals/seal-product',
};

export default ApiConfig;
