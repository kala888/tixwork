import Taro from '@tarojs/taro';
import { ActionListLike } from '@/nice-router/nice-router-types';
import ObjectUtils from '@/utils/object-utils';
import NavigationService from '@/nice-router/navigation-service';

export type PopupMessageProps = {
  title?: string;
  text: string;
  closeActionText?: string;
} & ActionListLike;

export default class GlobalPopup {
  static async show(options: PopupMessageProps) {
    const { title = '提示', text = '？', actionList = [], closeActionText = '关闭' } = options || {};
    const action = actionList.length > 0 ? actionList[0] : {};
    if (ObjectUtils.isNotEmpty(action)) {
      const { title: confirmText = '' } = action;
      Taro.showModal({
        title,
        content: text,
        cancelText: closeActionText,
        confirmText,
      }).then((res) => {
        if (res.confirm) {
          if (action.ajax) {
            NavigationService.ajax(action);
            return;
          }
          NavigationService.view(action);
        }
      });
      return;
    }

    await Taro.showModal({
      title,
      content: text,
      cancelText: closeActionText,
    });
  }
}
