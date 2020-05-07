import { AtBadge } from 'taro-ui'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import ActionIcon from '@/components/navigation/action-icon'
import NavigationService from '@/nice-router/navigation.service'

import './styles.scss'

function NavigationBox(props) {
  const { list = [], className, customStyle = {} } = props

  const handleClick = (item) => {
    NavigationService.view(item)
  }

  const rootClass = classNames('navigation-box', className, {
    'navigation-box-center': list.length <= 5,
  })

  return (
    list.length > 0 && (
      <View className={rootClass} customStyle={customStyle}>
        {list.map((it) => {
          const { icon, imageUrl, title, badge, id } = it
          return (
            <View key={id} className='navigation-box-item' onClick={handleClick.bind(this, it)}>
              <View className='navigation-box-item-box'>
                <AtBadge value={badge}>
                  <ActionIcon className='navigation-box-item-image' icon={icon} imageUrl={imageUrl} />
                </AtBadge>
                <View className='navigation-box-item-title'>{title}</View>
              </View>
            </View>
          )
        })}
      </View>
    )
  )
}

NavigationBox.options = {
  addGlobalClass: true,
}
export default NavigationBox
