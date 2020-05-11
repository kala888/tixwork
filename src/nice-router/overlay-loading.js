import Taro from '@tarojs/taro'

export default class OverlayLoading {
  static async showLoadingModal(text = '正在处理中') {
    await Taro.showLoading({ title: text, mask: true })
  }

  static hideLoadingModal() {
    Taro.hideLoading()
  }
}
