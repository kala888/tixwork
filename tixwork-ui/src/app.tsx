import BizSchema from '@/biz-models/biz-schema';
import IconFont from '@/components/icon-font';
import RightContent from '@/components/layout/right-content';
import { getProfile } from '@/http';
import ApiConfig from '@/http/api-config';
import { API } from '@/http/api-types';
import Q from '@/http/http-request/q';
import { requestConfig } from '@/http/http-request/request-config';
import ObjectUtils from '@/utils/object-utils';
import { Settings as LayoutSettings } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { Space, theme } from 'antd';
import _ from 'lodash';
// import 'antd/dist/reset.css';
import { stringify } from 'querystring';
import React from 'react';
import { RuntimeAntdConfig } from 'umi';
import defaultSettings from '../config/defaultSettings';

const loginPath = '/login';
const appList = [
  {
    icon: '/logo.svg',
    title: '钛安科技',
    desc: '企业数字化转性领导者',
    url: 'https://www.tiandtech.com',
  },
  {
    icon: 'http://www.scts-law.com/views/new/assets/images/logo.jpg',
    title: '韬世律所',
    desc: '工作中的生活家，生活里的勤勉者',
    url: 'https://scts-law.com/',
  },
];
// 动态路由方案，通过patchClientRoutes，将路由信息注入到路由表。
// https://github.com/umijs/umi/issues/10146#issuecomment-1569427682
// 暂未启用，现在使用生成的biz-router，后面可以丢给后台返回，再动态注入

// export const patchClientRoutes = ({ routes }) => {
//   console.log('patchClientRoutes routes');
//   const layoutRoute = routes.find((it) => it.id === 'ant-design-pro-layout');
//   const list: any[] = [];
//   entityRoutes.forEach((it) => {
//     list.push({
//       path: it,
//       parentId: 'ant-design-pro-layout',
//       element: <ListofPage />,
//     });
//     list.push({
//       path: it + '/:id',
//       parentId: 'ant-design-pro-layout',
//       element: <DetailPage />,
//     });
//   });
//   const ext = _.unionBy([...(layoutRoute?.routes || []), ...list], 'path');
//   layoutRoute.routes = ext;
//   layoutRoute.children = ext;
//   return routes;
// };

export const antd: RuntimeAntdConfig = (memo) => {
  const theTheme = memo.theme || {};
  const theToken = theTheme.token || {};
  memo.theme = {
    ...theTheme,
    algorithm: theme.compactAlgorithm, // 配置 antd5 的预设 dark 算法
    token: {
      ...theToken,
      // colorPrimary: '#2088cc',
      // colorPrimary: 'red',
    },
  };
  memo.appConfig = {
    message: {
      // 配置 message 最大显示数，超过限制时，最早的消息会被自动关闭
      maxCount: 3,
    },
  };
  return memo;
};

export const request = requestConfig;

type InitialStateType = {
  profile?: API.ProfileInfo;
  settings?: Partial<LayoutSettings>;
  message?: {
    count: number;
  };
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<InitialStateType> {
  const settings = {
    ...defaultSettings,
    ...(BizSchema?.Root || {}),
  } as any;

  // login 业务无需获取profile和重定向
  if (location.pathname !== loginPath) {
    try {
      const resp = await getProfile();
      return { settings, profile: resp.data };
    } catch (error) {
      console.log('login issue');
    }
    // 2. 未登录，重定向到 login
    history.push({
      pathname: loginPath,
      search: stringify({
        redirect: location.pathname,
      }),
    });
  }
  return { settings };
}

const loopMenu = (routes) => {
  if (ObjectUtils.isEmpty(routes)) {
    return null;
  }
  return routes.map((it) => ({
    key: it.key || it.name,
    path: it.path || _.get(it, 'children[0].path'),
    ...it,
    icon: it.icon && <IconFont type={it.icon} />,
    routes: loopMenu(it.children),
  }));
};

// ！！！！next版本ProLayout 支持的api https://next-procomponents.ant.design/components/layout/#api
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  // @ts-ignore
  const userId = initialState?.profile?.user?.userId || initialState?.profile?.user?.id;
  // const userName = initialState?.profile?.user?.userName;
  return {
    // waterMarkProps: {
    //   content: `${userName}-${userId}`,
    // },
    contentStyle: {
      padding: 10,
      margin: 0,
    },
    appList,
    rightRender: () => <RightContent />,
    onPageChange: () => {
      const { location } = history;
      const currentPath = location?.pathname;
      // 如果没有登录，重定向到 login
      if (!userId && currentPath !== loginPath) {
        history.push({
          pathname: loginPath,
          search: stringify({
            redirect: currentPath,
          }),
        });
      }
    },
    // 看起来针对菜单导致的面包屑，应该自定义。
    // menu中的parentKeys只是在menu中选中的key。要想合理展示面包屑，应该是有合理的path结构'/manager', '/manager/user/', '/manager/user/:id'
    // breadcrumbProps: {
    //   minLength: 1, // 自动生成的list, detial会只有一路由，导致minLength=2的时候不展示
    // },
    // menuHeaderRender: undefined,
    menu: {
      params: { userId: initialState?.profile?.user?.id },
      request: async (params, defaultMenuData) => {
        // 目录和路由是两个东西，动态路由通过patchClientRoutes注入。
        // 动态目录不能控制路由，智能控制菜单结构，这里ApiConfig.getRouters名字不合适，应该是getMenus
        if (ObjectUtils.isNotEmpty(params?.userId)) {
          const resp = await Q.get<any[]>(ApiConfig.getRouters);
          return loopMenu(resp.data);
        }
        return loopMenu(defaultMenuData);
      },
    },
    menuItemRender: (item, defaultDom, props) => {
      //loopMenu改为routes以后，icon不能正常render，一级目录icon是dom，二级确实string
      const icon = React.isValidElement(item.icon) ? item.icon : <IconFont icon={item.icon as any} />;
      return (
        <Space className="side-menu-item" onClick={() => history.push(item?.path as any)}>
          {icon}
          <span className="side-menu-item-text"> {item.name}</span>
        </Space>
      );
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};
