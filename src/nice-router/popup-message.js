import Taro from '@tarojs/taro'
import NavigationService from './navigation-service'
import { isNotEmpty } from './nice-router-util'

export default class PopupMessage {
  static async show(options = {}) {
    const { title = '提示', text = '？', actionList = [], closeActionText = '关闭' } = options
    const action = actionList.length > 0 ? actionList[0] : null
    if (isNotEmpty(action)) {
      const { title: confirmText = '' } = action
      Taro.showModal({
        title,
        content: text,
        cancelText: closeActionText,
        confirmText,
      }).then((res) => {
        if (res.confirm) {
          if (action.ajax) {
            NavigationService.ajax(action)
            return
          }
          NavigationService.view(action)
        }
      })
      return
    }

    await Taro.showModal({
      title,
      content: text,
      cancelText: closeActionText,
    })
  }
}
