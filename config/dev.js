module.exports = {
  env: {
    NODE_ENV: '"development"',
  },
  defineConstants: {},
  mini: {
    // //taro2.0.6 有分离lodash和这个有冲突，mini 配置没有做细粒度的 merge
    // webpackChain(chain) {
    //   chain.plugin('analyzer')
    //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
    // },
  },
  h5: {
    // webpackChain(chain) {
    //   chain.plugin('analyzer')
    //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
    // },
  },
}
