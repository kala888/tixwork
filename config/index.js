// eslint-disable-next-line import/no-commonjs
const path = require('path')  // 加在最上面

const config = {
  projectName: 'nice-router',
  date: '2019-5-14',
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
    patterns: [
      { from: 'src/sitemap.json', to: 'dist/' },
    ],
    options: {
    }
  },
  framework: 'react',
  alias: {
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
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    webpackChain(chain) { // 将 lodash 单独拆分出来 (防止vendors.js过大)
      // chain.plugin('analyzer')
      //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
      chain.plugin('lodash-webpack-plugin').use(require('lodash-webpack-plugin'),[{shorthands:true,coercions:true}])
      chain.merge({
        optimization: {
          splitChunks: {
            cacheGroups: {
              lodash: {
                name: 'lodash',
                priority: 1000,
                test(module) {
                  return /node_modules[\\/]lodash/.test(module.context)
                },
              },
            },
          },
        },
      })
    },
    commonChunks(commonChunks) { // 添加 lodash 公共文件
      commonChunks.push('lodash')
      return commonChunks
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
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
