import Taro from '@tarojs/components'
import NavigationService from './navigation.service'

export default class PopupMessage {
  handleLike = () => {
    const { actions = {} } = this.props
    const { like } = actions
    this.setState(
      (pre) => ({
        likeCount: like.code === 'like' ? pre.likeCount + 1 : pre.likeCount - 1,
      }),
      () => {
        NavigationService.ajax(
          like,
          {},
          {
            onSuccess: (resp) => {
              this.setState({ likeCount: resp.likeCount })
            },
          }
        )
      }
    )
  }

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
