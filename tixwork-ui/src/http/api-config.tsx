const ApiConfig = {
  getTenantOptions: '/api/auth/tenant/list',
  login: '/api/auth/login',
  logout: '/api/auth/logout',
  getCode: '/api/auth/code',
  getMobileVerifyCode: '/api/verifyCode/:mobile',

  // resource 资源
  post: '/api/system/post',
  notice: '/api/system/notice',
  loginRecord: '/api/monitor/login-record',
  importExportRecord: '/api/monitor/import-export',
  operationLog: '/api/monitor/operation-log',
  online: '/api/monitor/online',
  scheduler: '/api/monitor/scheduler',
  //common data
  dataCities: '/api/data/cities',

  //oss
  ossObject: '/api/system/oss-object',
  upload: '/api/system/oss-object/upload',
  ossConfig: '/api/system/oss-config',

  //profile
  profile: '/api/profile',
  updateAvatar: '/api/profile/updateAvatar',
  updatePassword: '/api/profile/updatePassword',
  updateMobile: '/api/profile/bindMobile',
  getRouters: '/api/profile/getRouters',
  getUnreadNotice: '/api/profile/getNotices',

  //config
  config: '/api/system/config',
  refreshCache: '/api/system/config/refreshCache',
  configByKey: '/api/system/config/key/:key', // 根据参数键名查询参数值, 暂未使用，可以提供前台配置

  //role
  role: '/api/system/role',
  changeRoleMenu: '/api/system/role/changeRoleMenu',
  changeRoleDataScope: '/api/system/role/dataScope',
  unauthorized: '/api/system/role/authUser/cancel',

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
  listUsersByRole: '/api/system/user/list-users-by-role/:roleId',
  // 角色数据权限 PUT /api/system/user/dataScope
  // 角色状态修改 PUT /api/system/user/changeStatus
  // 插入角色用户 POST /system/user/addRoleUser
  unlock: '/api/system/user/unlock/:userName',

  //department
  dept: '/api/system/dept',
  deptTree: '/api/system/dept/tree',
  roleDeptTreeselect: '/api/system/dept/tree/:roleId',

  //admin相关的url
  resetUserPassword: '/api/system/admin/resetUserPassword/:userId',

  // tenant: 'api/system/tenant',
  tenantPackage: 'api/system/tenant-package',
  updatePackageMenus: '/api/system/tenant-package/changeMenus',
  switchTenant: '/api/system/tenant/dynamic/:id',
  clearTenant: '/api/system/tenant/dynamic/clear',
  dynamicTenant: '/api/system/tenant/dynamic',
  syncTenantPackage: '/api/system/tenant/syncTenantPackage',

  //user
  client: '/api/system/client',
};

export default ApiConfig;
