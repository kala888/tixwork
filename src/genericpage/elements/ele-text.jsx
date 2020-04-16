import { Text } from '@tarojs/components'
import classNames from 'classnames'
import NavigationService from '@/nice-router/navigation.service'

function EleText(props) {
  const { text, action, customStyle, className } = props
  const onClick = () => NavigationService.view(action)

  const rootClass = classNames('ele-text', className)
  return (
    <Text className={rootClass} style={customStyle} onClick={onClick}>
      {text}
    </Text>
  )
}

EleText.options = {
  addGlobalClass: true,
}

EleText.defaultProps = {
  text: '',
  action: null,
  customStyle: {},
}

export default EleText
