import { AtBadge } from 'taro-ui'
import { Image, View } from '@tarojs/components'
import NavigationService from '@/nice-router/navigation.service'
import classNames from 'classnames'

import './styles.scss'

import commerceIcon from '../../assets/icon/icon_liansuo@2x.png'

function NavigationBoxBar(props) {
  const { list = [], className, customStyle = {} } = props

  const handleClick = (item) => {
    NavigationService.view(item)
  }

  const rootClass = classNames('navigation-bar', className)
  return (
    list.length > 0 && (
      <View className={rootClass} customStyle={customStyle}>
        {list.map((it, index) => {
          const { icon, imageUrl, title, badge, id } = it
          const isLast = index === list.length - 1
          return (
            <View key={id} className='navigation-bar-item'>
              <View className='navigation-box' onClick={handleClick.bind(this, it)}>
                <View className='navigation-box-badge'>
                  <AtBadge value={badge}>
                    <Image className='navigation-box-img' mode='widthFix' src={icon || imageUrl || commerceIcon} />
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

NavigationBoxBar.options = {
  addGlobalClass: true,
}
export default NavigationBoxBar
