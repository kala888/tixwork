import Taro from '@tarojs/taro'

export default class OverlayLoading {
  static showLoadingModal(text = '正在处理中') {
    Taro.showLoading({ title: text, mask: true })
  }

  static hideLoadingModal() {
    Taro.hideLoading()
  }
}
