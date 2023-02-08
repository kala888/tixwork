import Taro from '@tarojs/taro';

export type GlobalToastProps = {
  text: string;
  duration?: number;
  icon?: 'success' | 'loading' | 'none';
};
export default class GlobalToast {
  static show({ text, duration = 2000, icon = 'none' }: GlobalToastProps) {
    Taro.showToast({ title: text, duration, icon }).then();
  }
}
