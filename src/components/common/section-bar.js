import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import NavigationService from '@/nice-router/navigation.service'
import ServerImage from '@/components/image/server-image'

import './styles.scss'
import moreIcon from '../../assets/icon/icon_more@2x.png'

export default class SectionBar extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  handleClick = () => {
    NavigationService.view(this.props)
  }

  render() {
    const { title, brief = '', secondTitle, className, customStyle = {} } = this.props
    const showMore = NavigationService.isActionLike(this.props)
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
          <View className='section-bar-action' onClick={this.handleClick}>
            MORE
            <ServerImage my-class='section-bar-action-image' src={moreIcon} />
          </View>
        )}
      </View>
    )
  }
}
