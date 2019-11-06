import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import NiceRouter from '@/nice-router/nice-router'
import Config from '@/utils/config'
import NavigationService from '@/nice-router/navigation.service'

import './app.scss'
import HomePage from './pages/home/home-page'
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
  models: models,
})
const store = dvaApp.getStore()
NiceRouter.start({ config: Config, container: dvaApp })

initial()

class App extends Component {
  componentWillMount() {
    NavigationService.dispatch('app/wxLogin')
  }

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
              // 应用新版本并重启
              updateManager.applyUpdate()
            }
          },
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
      'pages/biz/hello-daas-page',
      'pages/home/home-page',
      'pages/me/me-page',
      'pages/article/article-detail-page',
      'pages/login/login-page',
      // base
      'nice-router/h5-page',
      'nice-router/network-exception-page',
      'genericpage/generic-page',
      'genericpage/generic-page2',
      'genericpage/user-picker-page',
      'listof/listof-page',
      'listof/listof-page2',
      'listof/listof-page3',
      'listof/listof-page4',
      // biz
      'pages/biz/generic-test-page',
    ],

    permission: {
      'scope.userLocation': {
        desc: '你的位置信息将用于小程序位置接口的效果展示',
      },
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#6dbb4d',
      navigationBarTitleText: '双链科技',
      navigationBarTextStyle: 'white',
    },
    tabBar: {
      color: '#666',
      selectedColor: '#92cc7a',
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
        <HomePage />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
