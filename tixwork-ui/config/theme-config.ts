import defaultSettings from './defaultSettings';
// Theme for antd: https://ant.design/docs/react/customize-theme-cn
export default {
  // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
  // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
  // https://ant.design/docs/react/customize-theme-variable-cn
  'primary-color': defaultSettings.colorPrimary,
  'text-color': '#333',
  'text-color-secondary': '#999',
  'heading-color': '#222222',
  'font-size-base': '13px',
  'border-color-base': '#dee0e3',
  'border-radius-base': '4px',
  'border-radius-sm': '4px',
  'btn-border-radius-base': '2px',
  'btn-border-radius-sm': '2px',
  'font-family': `'Microsoft YaHei', 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
};
