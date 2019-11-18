import Taro from '@tarojs/taro'
import { AtBadge } from 'taro-ui'
import { Image, View } from '@tarojs/components'
import NavigationService from '@/nice-router/navigation.service'
import classNames from 'classnames'

import './biz/styles.scss'

import commerceIcon from '../assets/icon/icon_liansuo@2x.png'

export default class NavigationBoxBar extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  handleClick = (item) => {
    NavigationService.view(item)
  }

  render() {
    const { list = [], className, customStyle = {} } = this.props
    const rootClass = classNames('navigation-bar', className)
    return (
      list.length > 0 && (
        <View className={rootClass} customStyle={customStyle}>
          {list.map((it, index) => {
            const { icon, imageUrl, title, badge } = it
            const isLast = index === list.length - 1
            return (
              <View key={it.id} className='navigation-bar-item'>
                <View className='navigation-box' onClick={this.handleClick.bind(this, it)}>
                  <View className='navigation-box-img'>
                    <AtBadge value={badge}>
                      <Image mode='widthFix' src={icon || imageUrl || commerceIcon} />
                    </AtBadge>
                  </View>
                  <View className='navigation-box-txt'>{title}</View>
                </View>
                {!isLast && <View className='navigation-bar-item-break' />}
              </View>
            )
          })}
        </View>
      )
    )
  }
}
