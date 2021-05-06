
// 作为h5嵌入到其他webview中时，如果需要调试，打开注释
// const vConsolePlugin = require('vconsole-webpack-plugin');

module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
  },
  mini: {},
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */

    // webpackChain (chain) {
    //   chain.plugin('vconsole-webpack-plugin').use(vConsolePlugin, [{enable: true}]);
    // }
  }
}
