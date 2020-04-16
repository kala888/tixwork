import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import { isEmpty, noop } from '@/nice-router/nice-router-util'
import './styles.scss'

function ActionField(props) {
  const { value, placeholder, disabled, onClick } = props
  const handleClick = () => {
    if (!disabled) {
      onClick()
    }
  }

  const showAsPlaceholder = isEmpty(value)
  const contentClass = classNames('action-field-content', { placeholder: showAsPlaceholder, disabled })
  const content = showAsPlaceholder ? placeholder : value
  return (
    <View className='action-field'>
      <Text className={contentClass} onClick={handleClick}>
        {content}
      </Text>
      {!disabled && props.children}
    </View>
  )
}

ActionField.options = {
  addGlobalClass: true,
}

ActionField.defaultProps = {
  disabled: false,
  onClick: noop,
}
export default ActionField
