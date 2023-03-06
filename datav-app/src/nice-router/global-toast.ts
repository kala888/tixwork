import Toast from 'teaset/components/Toast/Toast'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import _ from 'lodash'

export type GlobalToastProps = {
  text: string;
  duration?: number;
  icon?: 'success' | 'loading' | 'none';
};
let key = null
export default class GlobalToast {
  static show(props) {
    const text = _.get(props, 'text', props)
    const duration = _.get(props, 'duration', 2000)
    if (isNotEmpty(key)) {
      Toast.hide(key)
    }
    key = Toast.show({ text, duration, position: 'center' })
  }
}
