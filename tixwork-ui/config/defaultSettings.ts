import { ProLayoutProps } from '@ant-design/pro-components';

// const primaryColor = '#28aaff';
const primaryColor = '#2088cc';

type SettingsType = {
  pwa?: boolean;
  logo?: string;
} & ProLayoutProps;

const Settings: SettingsType = {
  // 目录较少的时候，可以注释掉layout，fixSiderbar，splitMenus 使用侧栏menu模式
  // layout: 'mix',
  // fixSiderbar: true,
  // splitMenus: true,

  siderWidth: 200,
  contentWidth: 'Fluid',
  navTheme: 'light',
  // colorPrimary: '#2088cc',
  colorPrimary: primaryColor,
  title: 'Tixwork',
  pwa: false,
  logo: '/logo.svg',
  // @ts-ignore
  iconfontUrl: [
    '//at.alicdn.com/t/c/font_2874175_98kgahcqaww.js', //tixwork-ui
    '//at.alicdn.com/t/font_1759823_ihovf9ewvhk.js', //nice-router-taro
  ],
  token: {
    // ProComponent的token？
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
    // colorTextAppListIcon: 'red',
    header: {
      colorTextMenuSelected: primaryColor,
    },
    sider: {
      colorTextMenuSelected: primaryColor,
    },
  },
};

export default Settings;
