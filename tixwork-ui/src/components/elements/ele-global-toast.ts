import { message, notification } from 'antd';

export type EleGlobalToastProps = {
  text: string;
  duration?: number;
  icon?: 'success' | 'loading' | 'none';
};
export default class EleGlobalToast {
  static show({ text, duration = 2000, icon = 'none' }: EleGlobalToastProps) {
    const theDuration = duration / 1000;
    if (icon === 'loading') {
      message.loading(text, theDuration);
      return;
    }
    const params = {
      message: '消息提示',
      description: text,
      duration: theDuration,
    };
    const fn = icon === 'success' ? notification.success : notification.info;
    fn(params);
  }
}
