import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import { isEmpty, noop } from '@/nice-router/nice-router-util'
import classNames from 'classnames'
import './styles.scss'

export default class ActionField extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    disabled: false,
    onClick: noop,
  }

  handleClick = () => {
    const { disabled, onClick } = this.props
    if (!disabled) {
      onClick()
    }
  }

  render() {
    const { value, placeholder, disabled } = this.props
    const showAsPlaceholder = isEmpty(value)
    const contentClass = classNames('action-field-content', { placeholder: showAsPlaceholder, disabled })
    const content = showAsPlaceholder ? placeholder : value
    return (
      <View className='action-field'>
        <Text className={contentClass} onClick={this.handleClick}>
          {content}
        </Text>
        {!disabled && this.props.children}
      </View>
    )
  }
}
