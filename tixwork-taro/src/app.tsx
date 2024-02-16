import { PropsWithChildren } from 'react';
import { isH5, isWeapp, noop } from '@/utils';
import Taro, { useLaunch } from '@tarojs/taro';
import { ModelProvider } from '@/model/model-provider';
import './app.less';
import TestData from './pages/mock-data/test-data';
import { models } from '@/model/models';

TestData.initial();

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (isDevEnv() && isH5()) {
//   require('nerv-devtools')
// }

if (isH5()) {
  // h5中useShareAppMessage不支持，临时设置不报错处理
  // TODO  未来某个版本可能会支持share，再移除
  if (!Taro.useShareAppMessage) {
    Taro.useShareAppMessage = noop;
  }
}
const updateWeapp = () => {
  if (Taro.canIUse('getUpdateManager')) {
    const updateManager = Taro.getUpdateManager();
    updateManager.onCheckForUpdate(() => {
      console.log('checking app update .......');
    });
    updateManager.onUpdateReady(() => {
      // noinspection JSIgnoredPromiseFromCall
      Taro.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function(res) {
          if (res.confirm) {
            updateManager.applyUpdate();
          }
        },
      });
    });
    updateManager.onUpdateFailed(() => {
      // noinspection JSIgnoredPromiseFromCall
      Taro.showModal({
        title: '更新提示',
        content: '新版本下载失败，请检查你的微信',
        showCancel: false,
      });
    });
  } else {
    // noinspection JSIgnoredPromiseFromCall
    Taro.showModal({
      title: '微信升级',
      content: '当前微信版本过低，部分功能无法使用，请升级到最新版本',
      showCancel: false,
    });
  }
};

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    if (isWeapp()) {
      updateWeapp();
    }
  });
  return (
    <ModelProvider models={models}>
      {children}
    </ModelProvider>
  );
}

export default App;
