// https://umijs.org/config/
import { defineConfig } from '@umijs/max';
import { chainWebpack } from './chain-webpack';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
import ThemeLessConfig from './theme-less-config';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  favicons: ['/favicon.svg'],
  headScripts: [
    { src: '/ie-check.js', async: true },
    // 解决首次加载时白屏的问题
    { src: '/scripts/loading.js', async: true },
  ],
  hash: true,
  // 无需配置，使用运行时刻（app.tsx中的export const antd={}）但是不能注释掉或者删掉, 不然不能正常工作
  antd: {
    configProvider: {},
    theme: {
      token: {
        colorPrimary: defaultSettings.colorPrimary,
      },
    },
    appConfig: {},
  },
  request: {},
  initialState: {},
  model: {},
  layout: {
    locale: false,
    ...defaultSettings,
  },
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  // umi routes: https://umijs.org/docs/routing
  routes,
  access: {},
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // 设置less中可用的变量
  theme: ThemeLessConfig,
  // mfsu: false, // 调试node_modules的时候需要设置为false
  // Fast Refresh 热更新
  fastRefresh: true,
  presets: ['umi-presets-pro'],
  chainWebpack,
  requestRecord: {},
});
