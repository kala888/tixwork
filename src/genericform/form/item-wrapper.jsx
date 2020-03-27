import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import { AtIcon, AtToast } from 'taro-ui'

import './styles.scss'

export default class ItemWrapper extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }
  static defaultProps = {
    errors: [],
    clear: true,
    bordered: false,
    value: null,
    showTail: true,
    disabled: false,
  }

  state = {
    visible: false,
  }

  showError = (visible) => this.setState({ visible })

  render() {
    const { bordered, clear, errors, value, onClear, showTail, disabled } = this.props
    const hasError = errors.length > 0
    const hasValue = isNotEmpty(value)
    // 没有disabled，没有错误，有值，显示清理btn，就展示
    const showClearAction = !disabled && !hasError && clear && hasValue

    const rootClass = classNames('item-wrapper', { 'item-wrapper-bordered': bordered })

    return (
      <View className={rootClass}>
        <View className='item-wrapper-children'>{this.props.children}</View>

        {showTail && (
          <View className='item-wrapper-tail'>
            {showClearAction && (
              <AtIcon className='item-wrapper-tail-clear' onClick={onClear} value='close-circle' size={20} />
            )}
            {hasError && (
              <AtIcon
                className='item-wrapper-tail-alert'
                onClick={this.showError.bind(this, true)}
                value='alert-circle'
                size={20}
              />
            )}
          </View>
        )}

        {hasError && (
          <AtToast
            text={errors[0]}
            onClose={this.showError.bind(this, false)}
            duration={3000}
            isOpened={this.state.visible}
          />
        )}
      </View>
    )
  }
}
