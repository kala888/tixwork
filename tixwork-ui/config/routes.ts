import _ from 'lodash';
import bizRoutes from './biz-routes';
// 多tab模式实现与问题，https://github.com/ant-design/ant-design-pro/issues/220

// 专门挖一块地，用来复写自动生成的页面
const customRoutes: any[] = [];

//customRoutes 通过path覆盖bizRoutes
const extraRoutes = _.uniqBy([...customRoutes, ...bizRoutes], 'path');

const routes = [
  ...extraRoutes,
  {
    path: '/test',
    layout: false,
    hideInMenu: true,
    component: './test-page',
  },

  {
    name: '系统登录',
    path: '/login',
    layout: false,
    hideInMenu: true,
    component: './login',
  },
  {
    name: '详情',
    path: '/detail/:objectType/:id',
    hideInMenu: true,
    component: './generic-page/detail-page',
  },
  {
    name: '列表',
    path: '/list/:objectType',
    hideInMenu: true,
    component: './generic-page/listof-page',
  },
  {
    name: '列表',
    path: '/panel/:objectType',
    hideInMenu: true,
    component: './generic-page/split-panel-page',
  },

  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    name: '工作台',
    path: '/dashboard',
    icon: 'home',
    component: './dashboard',
  },
  {
    name: '系统管理',
    icon: 'iconfont-system',
    path: '/system',

    routes: [
      { path: '/system', redirect: '/system/user' },
      {
        name: '用户管理',
        icon: 'iconfont-user',
        path: '/system/user',
        component: './system/user',
      },
      {
        name: '部门管理',
        icon: 'iconfont-department',
        path: '/system/department',
        component: './system/department',
      },
      {
        name: '岗位管理',
        icon: 'iconfont-post',
        path: '/system/post',
        component: './system/post',
      },
      {
        name: '角色管理',
        icon: 'iconfont-role',
        path: '/system/role',
        component: './system/role',
      },
      {
        name: '菜单管理',
        icon: 'iconfont-menu',
        path: '/system/menu',
        component: './system/menu',
      },
      {
        name: '字典管理',
        icon: 'iconfont-system',
        path: '/system/dict',
        component: './system/dict',
      },
      {
        name: '通知公告',
        icon: 'iconfont-notice',
        path: '/system/notice',
        component: './system/notice',
      },
    ],
  },
  {
    name: '系统监控',
    icon: 'iconfont-monitor',
    path: '/monitor',
    routes: [
      { path: '/monitor', redirect: '/monitor/online2' },
      {
        name: '在线用户',
        icon: 'iconfont-online',
        path: '/monitor/online',
        component: './monitor/online',
      },
      {
        name: '操作日志',
        path: '/monitor/operation-log',
        component: './monitor/operation-log',
      },
      {
        name: '登录日志',
        path: '/monitor/login-record',
        component: './monitor/login-record',
      },
      {
        name: '定时任务',
        icon: 'iconfont-scheduler',
        path: '/monitor/scheduler',
        component: './monitor/scheduler',
      },
      {
        name: '数据监控',
        icon: 'iconfont-druid',
        path: '/monitor/druid',
      },
      {
        name: '服务监控',
        icon: 'iconfont-cloud-sync',
        path: '/monitor/server',
      },
      {
        name: '缓存监控',
        icon: 'riconfont-edis',
        path: '/monitor/cache',
      },
      {
        name: 'Admin监控',
        icon: 'iconfont-admin',
        path: '/monitor/admin',
      },
    ],
  },

  {
    name: 'account',
    icon: 'iconfont-user',
    path: '/account',
    routes: [
      {
        name: 'settings',
        icon: 'iconfont-smile',
        path: '/account/settings',
        component: './account',
      },
    ],
  },
  {
    component: '404',
  },
];

export default routes;
