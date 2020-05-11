import Taro from '@tarojs/taro'

export default class GlobalToast {
  static async show({ text, duration = 2000, icon = 'none' }) {
    await Taro.showToast({ title: text, duration, icon })
  }
}
