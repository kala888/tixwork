// eslint-disable-next-line import/no-commonjs
const path = require('path');  // 加在最上面

const config = {
  projectName: 'tixwork-taro',
  date: '2022-5-25',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: 'react',
  compiler: {
    type: 'webpack5',
    prebundle: { //bug 等待处理https://github.com/NervJS/taro/issues/12281
      enable: false,
    },
  },
  cache: {
    enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  alias: {
    '@/http': path.resolve(__dirname, '..', 'src/http'),
    '@/model': path.resolve(__dirname, '..', 'src/model'),
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/service': path.resolve(__dirname, '..', 'src/service'),
    '@/nice-router': path.resolve(__dirname, '..', 'src/nice-router'),
    '@/genericpage': path.resolve(__dirname, '..', 'src/genericpage'),
    '@/genericform': path.resolve(__dirname, '..', 'src/genericform'),
    '@/server-image': path.resolve(__dirname, '..', 'src/server-image'),
    '@/listof': path.resolve(__dirname, '..', 'src/listof'),

  },
  mini: {
    enableExtract: true,
    miniCssExtractPluginOption: {
      ignoreOrder: true,
    },
    postcss: {
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
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    webpackChain(chain) {
      // chain.plugin('analyzer')
      //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])

      //lodash 瘦身配置
      // 奇怪行为，需要设置这个https://www.npmjs.com/package/lodash-webpack-plugin
      // 也可以移除一些，用来瘦身，目前发现shorthands，coercions，paths是必须的，否则会很诡异
      chain.plugin('lodash-webpack-plugin')
        .use(require('lodash-webpack-plugin'), [
          {
            shorthands: true,
            cloning: true,
            caching: true,
            collections: true,
            exotics: true,
            guards: true,
            memoizing: true,
            coercions: true,
            flattening: true,
            paths: true,
          }]);

      // 将 lodash 单独拆分出来 (防止vendors.js过大)
      chain.merge({
        optimization: {
          splitChunks: {
            cacheGroups: {
              lodash: {
                name: 'lodash',
                priority: 1000,
                test(module) {
                  return /node_modules[\\/]lodash/.test(module.context);
                },
              },
            },
          },
        },
      });
    },
    commonChunks(commonChunks) { // 添加 lodash 公共文件
      commonChunks.push('lodash');
      return commonChunks;
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    router: {
      mode: 'browser', // 或者是 'hash'
    },
    output: {
      filename: 'js/[name].[hash].js',
      chunkFilename: 'js/[name].[chunkhash].js',
    },
    imageUrlLoaderOption: {
      limit: 5000,
      name: 'static/images/[name].[hash].[ext]',
    },
    miniCssExtractPluginOption: {
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[name].[chunkhash].css',
    },
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  rn: {
    appName: 'NiceRouterDemo',
    postcss: {
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
      },
    },
  },
};

module.exports = function(merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }
  return merge({}, config, require('./prod'));
};
