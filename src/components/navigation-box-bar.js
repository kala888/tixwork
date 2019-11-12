import Taro from '@tarojs/taro'
import { AtBadge } from 'taro-ui'
import m_ from '@/utils/mini-lodash'
import toNumber from 'lodash/toNumber'
import { Image, View } from '@tarojs/components'
import NavigationService from '@/nice-router/navigation.service'
import classNames from 'classnames'

import './biz/styles.scss'

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
            const { icon, title, value } = it
            const isLast = index === list.length - 1
            const itemRender = (
              <View key={it.id} className='navigation-bar-item'>
                <View className='navigation-box' onClick={() => this.handleClick(it)}>
                  <View className='navigation-box-img'>
                    <Image mode='widthFix' src={icon} />
                  </View>
                  <View className='navigation-box-txt'>{title}</View>
                </View>
                {!isLast && <View className='navigation-bar-item-break' />}
              </View>
            )
            return m_.isNumber(value) && value > 0 ? (
              <AtBadge value={toNumber(value)}>{itemRender}</AtBadge>
            ) : (
              itemRender
            )
          })}
        </View>
      )
    )
  }
}
