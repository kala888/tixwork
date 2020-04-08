import { View } from '@tarojs/components'
import classNames from 'classnames'
import NavigationService from '@/nice-router/navigation.service'
import ServerImage from '@/server-image/server-image'

import './styles.scss'
import moreIcon from '../../assets/icon/icon_more@2x.png'

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
          MORE
          <ServerImage my-class='section-bar-action-image' src={moreIcon} />
        </View>
      )}
    </View>
  )
}

SectionBar.options = {
  addGlobalClass: true,
}
export default SectionBar
