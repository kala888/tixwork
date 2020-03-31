import Taro from '@tarojs/taro'
import NavigationService from './navigation.service'

export default class PopupMessage {
  static show(options = {}) {
    const { title, text, actionList = [], closeActionText = '关闭' } = options
    const confirmAction = actionList.length > 0 ? actionList[0] : null
    if (confirmAction) {
      Taro.showModal({
        title,
        content: text,
        cancelText: closeActionText,
        confirmText: confirmAction.title,
      }).then((res) => {
        if (res.confirm) {
          if (confirmAction.ajax) {
            NavigationService.ajax(confirmAction)
            return
          }
          NavigationService.view(confirmAction)
        }
      })
      return
    }

    Taro.showModal({
      title,
      content: text,
      cancelText: closeActionText,
    })
  }
}
