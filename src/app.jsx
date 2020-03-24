import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import { View } from '@tarojs/components'
import Config from '@/utils/config'
import NiceRouter from '@/nice-router/nice-router'

import './app.scss'
import dva from './dva'

import models from './models/model-center'
import { initial } from './service/initial.service'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5') {
//   require('nerv-devtools')
// }

const dvaApp = dva.createApp({
  initialState: {},
  enableLog: false,
  models: models,
})
const store = dvaApp.getStore()
NiceRouter.start({ config: Config, container: dvaApp })

initial()

class App extends Component {
  // componentWillMount() {
  //   NavigationService.dispatch('app/wxLogin')
  // }

  componentDidMount() {
    if (Taro.canIUse('getUpdateManager')) {
      const updateManager = Taro.getUpdateManager()
      updateManager.onCheckForUpdate(() => {})
      updateManager.onUpdateReady(() => {
        Taro.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function(res) {
            if (res.confirm) {
              updateManager.applyUpdate()
            }
          },
        })
      })
      updateManager.onUpdateFailed(() => {
        Taro.showModal({
          title: '更新提示',
          content: '新版本下载失败，请检查你的微信',
          showCancel: false,
        })
      })
    } else {
      Taro.showModal({
        title: '微信升级',
        content: '当前微信版本过低，部分功能无法使用，请升级到最新版本',
        showCancel: false,
      })
    }
  }

  config = {
    pages: [
      'pages/home/home-page',
      'pages/login/login-page',
      'pages/biz/generic-test-page',
      'pages/me/me-page',

      'pages/biz/hello-daas-page',

      // base
      'nice-router/h5-page',
      'nice-router/network-exception-page',
      'genericpage/generic-page',
      'genericpage/generic-page2',
      'genericpage/object-picker-page',
      'listof/listof-page',
      'listof/listof-page2',
      'listof/listof-page3',
      'listof/listof-page4',
      // biz
    ],
    //
    // permission: {
    //   'scope.userLocation': {
    //     desc: '你的位置信息将用于小程序位置接口的效果展示',
    //   },
    // },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#28aaff',
      navigationBarTitleText: 'nice-router',
      navigationBarTextStyle: 'white',
      enablePullDownRefresh: true,
    },
    tabBar: {
      color: '#666',
      selectedColor: '#28aaff',
      backgroundColor: '#fafafa',
      borderStyle: 'black',
      list: [
        {
          pagePath: 'pages/home/home-page',
          iconPath: './assets/icon/icon_home_n@2x.png',
          selectedIconPath: './assets/icon/icon_home_s@2x.png',
          text: '首页',
        },
        {
          pagePath: 'pages/biz/generic-test-page',
          iconPath: './assets/icon/icon_service_n@2x.png',
          selectedIconPath: './assets/icon/icon_service_s@2x.png',
          text: 'GenericPage',
        },
        {
          pagePath: 'pages/me/me-page',
          iconPath: './assets/icon/icon_me_n@2x.png',
          selectedIconPath: './assets/icon/icon_me_s@2x.png',
          text: '我的',
        },
      ],
    },
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <View />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
