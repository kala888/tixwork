import type { ActionLike, ActionList } from '@/utils/nice-router-types';
import { Modal } from 'antd';
// import NavigationService from '../../nice-router/navigation-service';
const NavigationService: any = {}; //TODO

export type EleGlobalPopupProps = {
  title?: string;
  text?: string;
  closeActionText?: string;
  confirmActionText?: string;
  actionList?: ActionList;
};

export default class EleGlobalPopup {
  static confirm(options: EleGlobalPopupProps): Promise<{ confirm: boolean }> {
    const {
      title = '提示',
      text = '？',
      closeActionText = '取消',
      confirmActionText = '确定',
    } = options || {};
    return new Promise((resolve) => {
      Modal.confirm({
        title,
        content: text,
        okText: confirmActionText,
        cancelText: closeActionText,
        onOk: () => resolve({ confirm: true }),
        onCancel: () => resolve({ confirm: false }),
      });
    });
  }

  static show(options: EleGlobalPopupProps) {
    const {
      title = '提示',
      text = '？',
      actionList = [],
      closeActionText = '关闭',
    } = options || {};
    const action = (actionList.length > 0 ? actionList[0] : {}) as ActionLike;
    const { title: confirmText = '确定' } = action;
    const handleOk = () => {
      if (action.ajax) {
        NavigationService.ajax(action);
        return;
      }
      NavigationService.view(action);
    };
    Modal.confirm({
      title,
      content: text,
      okText: confirmText,
      cancelText: closeActionText,
      onOk: handleOk,
    });
  }
}
