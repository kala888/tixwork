import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import { isEmpty } from '@/nice-router/nice-router-util'
import classNames from 'classnames'
import './styles.scss'

export default class ActionField extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  render() {
    const { value, placeholder, onClick } = this.props
    const showAsPlaceholder = isEmpty(value)
    const contentClass = classNames('action-field-content', { placeholder: showAsPlaceholder })
    const content = showAsPlaceholder ? placeholder : value
    return (
      <View className='action-field'>
        <Text className={contentClass} onClick={onClick}>
          {content}
        </Text>
        {this.props.children}
      </View>
    )
  }
}
