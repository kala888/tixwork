import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import { AtIcon } from 'taro-ui'
import NavigationService from '@/nice-router/navigation.service'

import './styles.scss'

function SectionBar(props) {
  const { title, brief = '', secondTitle, className, customStyle = {} } = props
  const onClick = () => {
    NavigationService.view(props)
  }

  const showMore = NavigationService.isActionLike(props)
  const rootClass = classNames('section-bar', className)

  return (
    <View className={rootClass} style={customStyle}>
      <View className='section-bar-preicon' />
      <View className='section-bar-title'>
        <View className='section-bar-title-txt-en'>{brief}</View>
        <View className='section-bar-title-txt'>{title}</View>
        {secondTitle && <View className='section-bar-title-second'>{secondTitle}</View>}
      </View>
      {showMore && (
        <View className='section-bar-action' onClick={onClick}>
          <Text className='section-bar-action-txt'>MORE</Text>
          <View className='section-bar-action-icon'>
            <AtIcon prefixClass='iconfont' value='chevron-right-double' size={18} />
          </View>
        </View>
      )}
    </View>
  )
}

SectionBar.options = {
  addGlobalClass: true,
}

export default SectionBar
