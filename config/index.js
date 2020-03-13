// eslint-disable-next-line import/no-commonjs
const path = require('path')  // 加在最上面

const config = {
  projectName: 'nice-router-taro',
  date: '2019-5-14',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  babel: {
    sourceMap: true,
    presets: [
      ['env', {
        modules: false,
      }],
    ],
    plugins: [
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread',
      ['transform-runtime', {
        helpers: false,
        polyfill: false,
        regenerator: true,
        moduleName: 'babel-runtime',
      },
      ],
    ],
  },
  copy: {
    patterns: [
      { from: 'src/sitemap.json', to: 'dist/' },
    ]
  },
  defineConstants: {},
  alias: {
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/genericpage': path.resolve(__dirname, '..', 'src/genericpage'),
    '@/listof': path.resolve(__dirname, '..', 'src/listof'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/pages': path.resolve(__dirname, '..', 'src/pages'),
    '@/nice-router': path.resolve(__dirname, '..', 'src/nice-router'),
    '@/package': path.resolve(__dirname, '..', 'package.json'),
    '@/project': path.resolve(__dirname, '..', 'project.config.json'),
  },
  mini: {
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8',
          ],
        },
      },
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 40240, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8',
          ],
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
}

module.exports = function(merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
