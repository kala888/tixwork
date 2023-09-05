import moment from 'moment';

const os = require('os');

const userInfo = os.userInfo();

const VersionPlugin = require('version-file-webpack-plugin');

export function chainWebpack(config) {
  config.plugin('version-file-webpack-plugin').use(VersionPlugin, [
    {
      output: 'version.json',
      data: {
        buildUser: userInfo.username,
        buildTime: moment().format('YYYY-MM-DD HH:mm:SS'),
        version: moment().format('YYYYMMDDHHmmSS'),
      },
    },
  ]);
}
