/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/api/': {
      target: 'http://localhost:8080/',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  // 可以使用yarn start:demo 来时用这个代理
  // 代理将localhost:8000/api/** 转给 https://demo.tiandtech.com/api/**
  demo: {
    '/api/': {
      target: 'https://demo.tiandtech.com/',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
      pathRewrite: { '^': '' },
      // pathRewrite: {'^/api/': ''},  //取消api
    },
  },
};
