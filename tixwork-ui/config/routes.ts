import _ from 'lodash';
import bizRoutes from './biz-routes';

/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */

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
    component: './generic-page/panel-page',
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
        name: '文件管理',
        icon: 'iconfont-file',
        path: '/system/oss-object',
        component: './system/oss-object',
      },
      {
        name: '通知公告',
        icon: 'iconfont-notice',
        path: '/system/notice',
        component: './system/notice',
      },
      {
        name: '参数设置',
        icon: 'iconfont-system',
        path: '/system/setting',
        component: './system/setting',
      },
      {
        name: 'OSS配置详情',
        path: '/system/oss-config/:id',
        hideInMenu: true,
        component: './system/setting/oss-config/detail-page',
      },
      {
        name: '客户端管理',
        path: '/system/client',
        component: './system/client',
      },
    ],
  },
  {
    name: '系统监控',
    icon: 'iconfont-monitor',
    path: '/monitor',
    routes: [
      { path: '/monitor', redirect: '/monitor/online' },
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
        name: '导入导出日志',
        icon: 'iconfont-cloud-file',
        path: '/monitor/import-export-record',
        component: './monitor/import-export-record',
      },
    ],
  },
  {
    name: '租户管理',
    icon: 'iconfont-tenant',
    path: '/tenant',
    routes: [
      {
        path: '/tenant',
        redirect: '/tenant/account',
      },
      {
        name: '租户管理',
        path: '/tenant/account',
        component: './tenant/account',
        icon: 'iconfont-tenant',
      },
      {
        name: '租户详情',
        path: '/tenant/account/:id',
        component: './generic-page/detail-page.tsx',
        hideInMenu: true,
      },
      {
        name: '租户套餐',
        path: '/tenant/package',
        component: './tenant/package',
        icon: 'iconfont-tenant-package',
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
    path: '*',
    layout: false,
    component: './404',
  },
];

export default routes;
