import { View } from '@tarojs/components'
import { AtIcon, AtToast } from 'taro-ui'
import classNames from 'classnames'

import { isNotEmpty } from '@/nice-router/nice-router-util'
import { useVisible } from '@/service/use.service'

import './styles.scss'

function ItemWrapper(props) {
  const { visible, show, close } = useVisible(false)

  const { bordered, clear, errors, value, onClear, inline, disabled } = props
  const hasError = errors.length > 0
  const hasValue = isNotEmpty(value)
  // 没有disabled，没有错误，有值，显示清理btn，就展示
  const showClearAction = !disabled && !hasError && clear && hasValue

  const rootClass = classNames('item-wrapper', { 'item-wrapper-bordered': bordered })

  return (
    <View className={rootClass}>
      <View className='item-wrapper-children'>{props.children}</View>

      {inline && (
        <View className='item-wrapper-tail'>
          {showClearAction && (
            <AtIcon className='item-wrapper-tail-clear' onClick={onClear} value='close-circle' size={20} />
          )}
          {hasError && <AtIcon className='item-wrapper-tail-alert' onClick={show} value='alert-circle' size={20} />}
        </View>
      )}

      {hasError && <AtToast text={errors[0]} onClose={close} duration={3000} isOpened={visible} />}
    </View>
  )
}

ItemWrapper.options = {
  addGlobalClass: true,
}
ItemWrapper.defaultProps = {
  errors: [],
  clear: true,
  bordered: true,
  value: null,
  inline: true,
  disabled: false,
}
export default ItemWrapper
