const MODULE_RESOLVER = [
  'module-resolver',
  {
    root: ['./src'],
    alias: {
      '@/components': './src/components',
      '@/utils': './src/utils',
      '@/service': './src/service',
      '@/nice-router': './src/nice-router',
      '@/genericpage': './src/genericpage',
      '@/genericform': './src/genericform',
      '@/server-image': './src/server-image',
      '@/listof': './src/listof',
      '@/pages': './src/pages',
    },
  },
]


module.exports = api => {
  const babelEnv = api.env()
  const plugins = [MODULE_RESOLVER]
  //change to 'production' to check if this is working in 'development' mode
  if (babelEnv !== 'development') {
    plugins.push(['transform-remove-console', { exclude: ['error', 'warn'] }])
  }
  return {
    presets: [
      ['module:metro-react-native-babel-preset'],
    ],
    plugins,
  }
}
