import Taro from '@tarojs/taro'
import { Text } from '@tarojs/components'
import NavigationService from '@/nice-router/navigation.service'
import EleHelper from '../ele-helper'

export default class EleText extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    text: '',
    action: null,
    customStyle: {},
  }

  render() {
    const { text, action, customStyle, className } = this.props

    const rootClass = EleHelper.classNames('ele-text', className)
    return (
      <Text className={rootClass} style={customStyle} onClick={() => NavigationService.view(action)}>
        {text}
      </Text>
    )
  }
}
