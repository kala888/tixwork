import { Settings as LayoutSettings } from '@ant-design/pro-components';

type SettingsType = {
  pwa?: boolean;
  logo?: string;
} & LayoutSettings;

const Settings: SettingsType = {
  siderWidth: 200,
  contentWidth: 'Fluid',
  navTheme: 'light',
  // fixedHeader: true,
  // layout: 'mix',

  // primaryColor: '#28aaff',
  // primaryColor: '#2088cc',
  colorPrimary: '#2088cc',
  title: 'Tixwork',
  pwa: false,
  logo: '/logo.svg',
  // @ts-ignore
  iconfontUrl: [
    '//at.alicdn.com/t/c/font_2874175_xct3cbemxtl.js', //tixwork-ui
    '//at.alicdn.com/t/font_1759823_ihovf9ewvhk.js', //nice-router-taro
  ],
};

export default Settings;
