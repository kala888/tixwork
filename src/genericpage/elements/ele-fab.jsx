import React from 'react'
import ActionIcon from '@/components/navigation/action-icon'
import NavigationService from '@/nice-router/navigation.service'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { AtFab } from 'taro-ui'
import './styles.scss'

function EleFab(props) {
  const { onClick, linkToUrl, imageUrl, text, icon, className, size, customStyle } = props
  const handleClick = () => {
    if (onClick) {
      onClick()
      return
    }
    NavigationService.view(linkToUrl)
  }

  const rootClass = classNames('ele-fab', className)
  return (
    <View className={rootClass} style={customStyle}>
      <AtFab size={size} onClick={handleClick}>
        <ActionIcon icon={icon} imageUrl={imageUrl} />
        <View className='ele-fab-txt'>{text}</View>
      </AtFab>
    </View>
  )
}

EleFab.defaultProps = {
  imageUrl: null,
  text: '',
  icon: null,
  customStyle: {},
  className: null,
  linkToUrl: null,
}

export default EleFab
