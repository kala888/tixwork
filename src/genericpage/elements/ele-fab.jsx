import { Text, View } from '@tarojs/components'
import { AtFab, AtIcon } from 'taro-ui'
import classNames from 'classnames'

import ServerImage from '@/server-image/server-image'
import NavigationService from '@/nice-router/navigation.service'

import './styles.scss'

function EleFab({ onClick, linkToUrl, imageUrl, text, icon, customStyle, className, size }) {
  const handleClick = () => {
    if (onClick) {
      onClick()
      return
    }
    NavigationService.view(linkToUrl)
  }

  const rootClass = classNames('ele-fab', className)
  return (
    <View className={rootClass}>
      <AtFab size={size} onClick={handleClick}>
        {icon ? (
          <AtIcon className='more-action-icon' value={icon} size={24} color='grey' />
        ) : (
          <View style={{ width: '25px', height: '25px' }}>
            {imageUrl && <ServerImage src={imageUrl} customStyle={{ width: '100%', height: '100%' }} />}
            {text && <Text style={{ width: '20px', height: '20px', ...customStyle }}>{text}</Text>}
          </View>
        )}
      </AtFab>
    </View>
  )
}

EleFab.options = {
  addGlobalClass: true,
}
EleFab.defaultProps = {
  imageUrl: null,
  text: null,
  icon: null,
  customStyle: {},
  className: null,
  linkToUrl: null,
}

export default EleFab
