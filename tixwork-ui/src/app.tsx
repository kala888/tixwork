import BizSchema from '@/biz-model/biz-schema';
import IconFont from '@/components/icon-font';
import RightContent from '@/components/layout/right-content';
import { getProfile } from '@/http';
import ApiConfig from '@/http/api-config';
import Q from '@/http/http-request/q';
import { requestConfig } from '@/http/http-request/request-config';
import { isNotEmpty } from '@/utils/object-utils';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { Space } from 'antd';
import { stringify } from 'querystring';
import defaultSettings from '../config/defaultSettings';

type InitialStateType = {
  profile?: API.ProfileInfo;
  settings?: Partial<LayoutSettings>;
};

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
  {
    icon: 'http://www.scts-law.com/views/new/assets/images/logo.jpg',
    title: '韬世律所',
    desc: '工作中的生活家，生活里的勤勉者',
    url: 'https://scts-law.com/',
  },
  {
    icon: '/logo.svg',
    title: '钛安科技',
    desc: '企业数字化转性领导者',
    url: 'https://www.tiandtech.com',
  },
];

export const request = requestConfig;

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<InitialStateType> {
  const settings = {
    ...defaultSettings,
    ...(BizSchema?.Root || {}),
  };
  try {
    const resp = await getProfile();
    return { settings, profile: resp.data };
  } catch (error) {
    console.log('login issue');
  }
  const currentPath = history?.location?.pathname;
  if (currentPath !== loginPath) {
    history.push({
      pathname: loginPath,
      search: stringify({
        redirect: currentPath,
      }),
    });
  }
  return { settings };
}

const loopMenu = (routes) =>
  routes.map((it) => ({
    ...it,
    icon: it.icon && <IconFont type={it.icon} />,
    children: isNotEmpty(it.routes) ? loopMenu(it.routes) : [],
  }));

// ！！！！next版本ProLayout 支持的api https://next-procomponents.ant.design/components/layout/#api
export const layout: RunTimeLayoutConfig = (props) => {
  const { initialState } = props;
  const userId = initialState?.profile?.user?.userId;
  // const userName = initialState?.profile?.user?.userName;
  return {
    contentStyle: {
      padding: 10,
      margin: 0,
    },
    token: {
      sider: {
        colorBgMenuItemSelected: 'rgba(94, 191, 255,0.1)',
        colorBgMenuItemHover: 'rgba(94, 191, 255,0.2)',
      },
    },
    appList,
    // waterMarkProps: {
    //   content: `${userName}-${userId}`,
    // },
    rightRender: () => <RightContent />,
    onPageChange: (location) => {
      console.log(props);
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
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    menu: {
      params: { userId: initialState?.profile?.user?.userId },
      request: async (params, defaultMenuData) => {
        // 动态加载页面：https://github.com/gamemock/ant-design-tabs/blob/main/src/utils/utils.tsx
        // 动态加载页面，也可以移除route，直接使用命名约定页面

        if (isNotEmpty(params?.userId)) {
          const resp = await Q.get<any[]>(ApiConfig.getRouters);
          return loopMenu(resp.data);
        }
        return loopMenu(defaultMenuData);
      },
    },
    menuItemRender: (item) => {
      return (
        <Space className="side-menu-item" onClick={() => history.push(item?.path as any)}>
          {item.icon}
          <span className="side-menu-item-text"> {item.name}</span>
        </Space>
      );
    },
    ...initialState?.settings,
  };
};
