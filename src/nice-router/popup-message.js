import Taro from '@tarojs/taro'
import ActionUtil from './action-util'
import NavigationService from './navigation.service'
import { isNotEmpty } from './nice-router-util'

export default class PopupMessage {
  static async show(options = {}) {
    const { title, text, actionList = [], closeActionText = '关闭' } = options
    const action = actionList.length > 0 ? actionList[0] : null
    const confirmContent = ActionUtil.getConfirmContent(action)
    if (isNotEmpty(confirmContent)) {
      Taro.showModal({
        title,
        content: text,
        cancelText: closeActionText,
        confirmText: action.title,
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
