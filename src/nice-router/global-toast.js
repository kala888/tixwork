import Taro from '@tarojs/taro'

export default class GlobalToast {
  static show({ text, duration = 2000, icon = 'none' }) {
    Taro.showToast({ title: text, duration, icon })
  }
}
